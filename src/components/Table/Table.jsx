import VueTypes from 'vue-types';
import _ from 'lodash';
import onResize from 'element-resize-event';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import WheelHandler from 'utils/WheelHandler';
import translateDOMPositionXY from 'utils/translateDOMPositionXY';
import { cloneElement, getKey } from 'utils/node';
import { getWidth, getHeight, addStyle } from 'shares/dom';

import TableRow from './TableRow.jsx';
import TableCell from './TableCell.jsx';
import TableCellGroup from './TableCellGroup.jsx';
import TableHeaderCell from './TableHeaderCell.jsx';
import TableScrollbar from './TableScrollbar.jsx';

import { formatColumns, toggleClass } from './utils';
import {
  TABLE_DEFAULT_HEIGHT,
  TABLE_HEADER_DEFAULT_HEIGHT,
  ROW_DEFAULT_HEIGHT,
  CELL_PADDING_HEIGHT,
} from './constants';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'table';

export default {
  name: 'Table',

  props: {
    width: VueTypes.number,
    height: VueTypes.custom(v => {
      if (typeof v === 'number') return true;

      return typeof v === 'string' && v === 'auto';
    }, '`height` must be a number or string `auto`').def(TABLE_DEFAULT_HEIGHT),
    minHeight: VueTypes.number,
    maxHeight: VueTypes.number,
    scrollbar: VueTypes.oneOfType([VueTypes.bool, VueTypes.object]).def(true),
    hover: VueTypes.bool,
    loading: VueTypes.bool.def(false),
    loadAnimation: VueTypes.bool.def(false),
    bordered: VueTypes.bool.def(false),
    cellBordered: VueTypes.bool.def(false),
    wordWrap: VueTypes.bool.def(false),
    showHeader: VueTypes.bool,
    // FIXME: calculate header height
    headerHeight: VueTypes.number.def(TABLE_HEADER_DEFAULT_HEIGHT),
    rowHeight: VueTypes.number.def(ROW_DEFAULT_HEIGHT),
    rowKey: VueTypes.oneOfType([VueTypes.func, VueTypes.string]),
    disabledScroll: VueTypes.bool.def(false),
    isTree: VueTypes.bool.def(false),
    data: VueTypes.arrayOf(VueTypes.object).def([]),
    columns: VueTypes.arrayOf(VueTypes.object).def([]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // onRowClick?: (rowData: Object) => void,
    // onScroll?: (scrollX: number, scrollY: number) => void,
    // onSortColumn?: (dataKey: string, sortType: SortType) => void,
    // onExpandChange?: (expanded: boolean, rowData: Object) => void,
    // onTouchStart?: (event: SyntheticTouchEvent<*>) => void, // for tests
    // onTouchMove?: (event: SyntheticTouchEvent<*>) => void, // for tests

    // setRowHeight(rowData) => number
    // isTree: boolean
    // defaultExpandAllRows: boolean
    // defaultExpandedRowKeys: Array<number|string>
    // expandedRowKeys: Array<number|string>
    // renderTreeToggle(btn, rowData) => Node
    // renderRowExpanded(row) => Node
    // sortColumn?: string,
    // sortType: 'desc' | 'asc',
  },

  data() {
    return {
      tableW: this.width || 0,

      contentW: 0,
      contentH: 0,

      scrollX: 0,
      scrollY: 0,

      touchX: 0,
      touchY: 0,

      minScrollX: 0,
      minScrollY: 0,

      isColumnResizing: false,

      wheelHandler: new WheelHandler(
        (deltaX, deltaY) => {
          this._handleWheel(deltaX, deltaY);
          this.$refs.scrollbarX && this.$refs.scrollbarX.onWheelScroll(deltaX);
          this.$refs.scrollbarY && this.$refs.scrollbarY.onWheelScroll(deltaY);
        },
        this._shouldHandleWheelX,
        this._shouldHandleWheelY
      ),
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('word-wrap')]: this.wordWrap,
          // [this._addPrefix('treetable')]: isTree,
          [this._addPrefix('bordered')]: this.bordered,
          [this._addPrefix('cell-bordered')]: this.cellBordered,
          [this._addPrefix('column-resizing')]: this.isColumnResizing,
          [this._addPrefix('hover')]: this.hover,
          [this._addPrefix('loading')]: this.loading,
        },
      ];
    },

    // height of table's header
    headerH() {
      return this.showHeader ? this.headerHeight : 0;
    },

    // height of table
    tableH() {
      return this.height === 'auto'
        ? Math.min(
            Math.max(this.headerH + this.contentH, this.minHeight),
            this.maxHeight
          )
        : this.height;
    },

    // format columns
    columnList() {
      return formatColumns(this.columns);
    },

    shouldFixedColumn() {
      return this.columnList.some(x => x.fixed);
    },
  },

  mounted() {
    this._calculateTableWidth();
    this._calculateTableContentWidth();
    this._calculateTableContentHeight();
    this._calculateRowMaxHeight();

    this.$refs.table &&
      onResize(this.$refs.table, _.debounce(this._calculateTableWidth, 400));
  },

  updated() {
    this._calculateTableContentWidth();
    this._calculateTableContentHeight();
    this._calculateRowMaxHeight();
    this._updatePosition();
  },

  render(h) {
    const { headerCells, bodyCells, totalWidth } = this._generateCells(h);
    const rowWidth = totalWidth > this.tableW ? totalWidth : this.tableW;
    const styles = {
      width: this.width || 'auto',
      height: `${this.tableH}px`,
    };

    return (
      <div class={this.classes} style={styles} ref="table">
        {this._renderTableHeader(h, headerCells, rowWidth)}
        {this._renderTableBody(h, bodyCells, rowWidth)}
        {this._renderMouseArea(h)}
      </div>
    );
  },

  methods: {
    _renderTableHeader(h, cells, rowWidth) {
      if (!this.showHeader) return null;

      const data = {
        ref: 'tableHeader',
        props: {
          top: 0,
          width: rowWidth,
          height: this.headerH,
          isHeaderRow: true,
        },
      };

      return (
        <div class={this._addPrefix('header-row-wrapper')} ref="headerWrapper">
          {this._renderRow(h, cells, data)}
        </div>
      );
    },

    _renderTableBody(h, cells, rowWidth) {
      if (!this.columnList.length) return null;

      let top = 0;
      let bodyHeight = 0;
      let rows = null;

      // data is not empty
      if (this.data.length > 0) {
        rows = _.cloneDeep(this.data).map((d, i) => {
          const rowKey = this._getRowKey(d, i);
          let nextRowHeight =
            (this.rowHeightMap && this.rowHeightMap[rowKey]) || this.rowHeight;

          // TODO: expandedRowHeight & custom rowHeight

          const props = {
            key: rowKey,
            index: i,
            top,
            layer: 0,
            width: rowWidth,
            height: nextRowHeight,
          };

          bodyHeight += nextRowHeight;

          !this.isTree && (top += nextRowHeight);

          return this._renderRowData(h, cells[i], props, d, false);
        });
      }

      const bodyStyles = {
        top: `${this.headerH}px`,
        height: `${this.tableH - this.headerH}px`,
      };

      const wheelStyles = {
        position: 'absolute',
        height: `${bodyHeight}px`,
        minHeight: `${this.tableH - this.headerH}px`,
      };

      return (
        <div
          ref="tableBody"
          class={this._addPrefix('body-row-wrapper')}
          style={bodyStyles}
          onTouchStart={this._handleTouchStart}
          onTouchMove={this._handleTouchMove}
          onWheel={this.wheelHandler.onWheel}
        >
          <div
            ref="wheelWrapper"
            class={this._addPrefix('body-wheel-area')}
            style={wheelStyles}
          >
            {rows}
          </div>

          {this._renderInfo(h, rows === null)}
          {this._renderScrollbar(h)}
          {this._renderLoading(h)}
        </div>
      );
    },

    _renderRowData(h, cells, props, data, shouldRenderExpanded) {
      const hasChildren =
        this.isTree && data.children && Array.isArray(data.children);
      const mapCell = cell =>
        cloneElement(cell, {
          key: `${getKey(cell)}_${props.layer}`,
          props: {
            layer: props.layer,
            height: props.height,
            rowIndex: props.index,
            rowData: data,
            wordWrap: this.wordWrap,
            hasChildren,
          },
        });
      const rowCells = [
        cells[0].map(mapCell),
        cells[1].map(mapCell),
        cells[2].map(mapCell),
      ];
      const row = this._renderRow(
        h,
        rowCells,
        {
          key: props.index,
          props: {
            top: props.top,
            width: props.width,
            height: props.height,
          },
          on: {
            click: () => this.$emit('row-click', data, props.index),
          },
        },
        shouldRenderExpanded
      );

      if (!hasChildren) return row;

      // isTree
      props.layer += 1;

      // expanded tree
      const open = false;
      const childrenClasses = [
        this._addPrefix('row-has-children'),
        {
          [this._addPrefix('row-open')]: open,
        },
      ];

      return (
        <div class={childrenClasses} key={props.index} data-layer={props.layer}>
          {row}
          <div class={this._addPrefix('row-children')}>
            {data.children.map((child, index) =>
              this._renderRowData(
                h,
                cells,
                {
                  ...props,
                  index,
                },
                child
              )
            )}
          </div>
        </div>
      );
    },

    _renderRow(h, cells, compData, shouldRenderExpanded) {
      const [leftFixedCells, middleCells, rightFixedCells] = cells;

      return (
        <TableRow {...compData}>
          {leftFixedCells.length > 0 && (
            <TableCellGroup
              fixed="left"
              width={this.totalFixedLeftWidth}
              height={compData.props.height}
            >
              {leftFixedCells}
            </TableCellGroup>
          )}
          {rightFixedCells.length > 0 && (
            <TableCellGroup
              fixed="right"
              left={this.tableW - this.totalFixedRightWidth}
              width={this.totalFixedRightWidth}
              height={compData.props.height}
            >
              {rightFixedCells}
            </TableCellGroup>
          )}
          <TableCellGroup>{middleCells}</TableCellGroup>
          {/* TODO: renderExpand */}
        </TableRow>
      );
    },

    _renderScrollbar(h) {
      if (!this.scrollbar) {
        return null;
      }

      const showX = this.scrollbar === true || this.scrollbar.x === true;
      const showY = this.scrollbar === true || this.scrollbar.y === true;

      return (
        <div>
          {showX && (
            <TableScrollbar
              ref="scrollbarX"
              length={this.tableW}
              scrollLength={this.contentW}
              onScroll={this._handleScrollX}
            />
          )}
          {showY && (
            <TableScrollbar
              ref="scrollbarY"
              vertical
              length={this.tableH - this.headerH}
              scrollLength={this.contentH}
              onScroll={this._handleScrollY}
            />
          )}
        </div>
      );
    },

    _renderLoading() {
      if (!this.loadAnimation && !this.loading) {
        return null;
      }

      return (
        <div class={this._addPrefix('loader-wrapper')}>
          <div class={this._addPrefix('loader')}>
            <i class={this._addPrefix('loader-icon')} />
            <span class={this._addPrefix('loader-text')}>
              {this.$t('_.Table.loading')}
            </span>
          </div>
        </div>
      );
    },

    _renderInfo(h, isEmpty) {
      if (!isEmpty) return null;

      return (
        <div class={this._addPrefix('body-info')}>
          {this.$t('_.Table.emptyMessage')}
        </div>
      );
    },

    _renderMouseArea() {
      if (!this.showHeader) return null;

      const styles = { height: `${this.tableH}px` };

      return (
        <div
          class={this._addPrefix('mouse-area')}
          style={styles}
          ref="mouseArea"
        >
          <span style={{ height: `${this.headerH - 1}px` }} />
        </div>
      );
    },

    _handleResize() {},

    _handleResizeStart(width, left, fixed) {
      this.isColumnResizing = true;

      const mouseAreaLeft = width + left;
      const x = fixed ? mouseAreaLeft : mouseAreaLeft + (this.scrollX || 0);
      const styles = { display: 'block' };

      translateDOMPositionXY(styles, x, 0);

      if (this.$refs.mouseArea) {
        addStyle(this.$refs.mouseArea, styles);
      }
    },

    _handleResizeMove(width, left, fixed) {
      const mouseAreaLeft = width + left;
      const x = fixed ? mouseAreaLeft : mouseAreaLeft + (this.scrollX || 0);
      const styles = {};

      translateDOMPositionXY(styles, x, 0);

      if (this.$refs.mouseArea) {
        addStyle(this.$refs.mouseArea, styles);
      }
    },

    _handleResizeEnd(columnWidth, cursorDelta, columnKey, index) {
      this.isColumnResizing = false;

      this.columnWidthMap[columnKey] = columnWidth;

      if (this.$refs.mouseArea) {
        addStyle(this.$refs.mouseArea, { display: 'none' });
      }
    },

    _handleTouchStart(event) {
      const { pageX, pageY } = event.touches ? event.touches[0] : {};

      this.touchX = pageX;
      this.touchY = pageY;

      this.$emit('touch-start', event);
    },

    _handleTouchMove(event) {
      event.stopPropagation();
      event.preventDefault();

      const { pageX: nextPageX, pageY: nextPageY } = event.touches
        ? event.touches[0]
        : {};
      const deltaX = this.touchX - nextPageX;
      const deltaY = this.touchY - nextPageY;

      this._handleWheel(deltaX, deltaY);

      this.$refs.scrollbarX && this.$refs.scrollbarX.onWheelScroll(deltaX);
      this.$refs.scrollbarY && this.$refs.scrollbarY.onWheelScroll(deltaY);

      this.touchX = nextPageX;
      this.touchY = nextPageY;

      this.$emit('touch-move', event);
    },

    _handleWheel(deltaX, deltaY) {
      if (!this.$refs.table) {
        return;
      }

      const nextScrollX = this.scrollX - deltaX;
      const nextScrollY = this.scrollY - deltaY;

      this.scrollY = Math.min(
        0,
        nextScrollY < this.minScrollY ? this.minScrollY : nextScrollY
      );
      this.scrollX = Math.min(
        0,
        nextScrollX < this.minScrollX ? this.minScrollX : nextScrollX
      );

      this._updatePosition();

      this.$emit('scroll', this.scrollX, this.scrollY);
    },

    _handleScrollX(delta) {
      this._handleWheel(delta, 0);
    },

    _handleScrollY(delta) {
      this._handleWheel(0, delta);
    },

    _updatePosition() {
      // 当存在锁定列情况处理
      if (this.shouldFixedColumn) {
        this._updatePositionByFixedCell();
      } else {
        const wheelStyle = {};
        const headerStyle = {};

        translateDOMPositionXY(wheelStyle, this.scrollX, this.scrollY);
        translateDOMPositionXY(headerStyle, this.scrollX, 0);

        this.$refs.wheelWrapper &&
          addStyle(this.$refs.wheelWrapper, wheelStyle);
        this.$refs.headerWrapper &&
          addStyle(this.$refs.headerWrapper, headerStyle);
      }

      if (this.$refs.tableHeader) {
        toggleClass(
          this.$refs.tableHeader.$el,
          this._addPrefix('cell-group-shadow'),
          this.scrollY < 0
        );
      }
    },

    _updatePositionByFixedCell() {
      const wheelGroupStyle = {};
      const wheelStyle = {};
      const scrollGroups =
        (this.$refs.table &&
          this.$refs.table.querySelectorAll(
            `.${this._addPrefix('cell-group-scroll')}`
          )) ||
        [];
      // FIXME: support right fixed
      const leftFixedGroups =
        (this.$refs.table &&
          this.$refs.table.querySelectorAll(
            `.${this._addPrefix('cell-group-fixed-left')}`
          )) ||
        [];
      const rightFixedGroups =
        (this.$refs.table &&
          this.$refs.table.querySelectorAll(
            `.${this._addPrefix('cell-group-fixed-right')}`
          )) ||
        [];

      translateDOMPositionXY(wheelGroupStyle, this.scrollX, 0);
      translateDOMPositionXY(wheelStyle, 0, this.scrollY);

      Array.from(scrollGroups).forEach(group => {
        addStyle(group, wheelGroupStyle);
      });

      if (this.$refs.wheelWrapper) {
        addStyle(this.$refs.wheelWrapper, wheelStyle);
      }

      Array.from(leftFixedGroups).forEach(group => {
        toggleClass(
          group,
          this._addPrefix('cell-group-shadow-right'),
          this.scrollX < 0
        );
      });

      Array.from(rightFixedGroups).forEach(group => {
        toggleClass(
          group,
          this._addPrefix('cell-group-shadow-left'),
          this.scrollX >= Math.min(this.tableW - this.contentW, 0)
        );
      });
    },

    _shouldHandleWheelX(delta) {
      if (delta === 0 || this.disabledScroll || this.loading) {
        return false;
      }

      if (this.tableW && this.contentW <= this.tableW) {
        return false;
      }

      return (
        (delta >= 0 && this.scrollX > this.minScrollX) ||
        (delta < 0 && this.scrollX < 0)
      );
    },

    _shouldHandleWheelY(delta) {
      if (delta === 0 || this.disabledScroll || this.loading) {
        return false;
      }

      return (
        (delta >= 0 && this.scrollY > this.minScrollY) ||
        (delta < 0 && this.scrollY < 0)
      );
    },

    // calculate the with of table
    _calculateTableWidth() {
      const $table = this.$refs.table;

      if (!$table) return;

      this.scrollX = 0;
      this.$refs.scrollbarX && this.$refs.scrollbarX.resetScrollBarPosition();

      this.tableW = getWidth($table);
    },

    // calculate the content width of table
    _calculateTableContentWidth() {
      const $table = this.$refs.table;

      if (!$table) return;

      const row = $table.querySelector(`.${this._addPrefix('row')}`);
      const contentW = row ? getWidth(row) : 0;

      if (this.contentW !== contentW) {
        this.scrollX = 0;
        this.$refs.scrollbarX && this.$refs.scrollbarX.resetScrollBarPosition();
      }

      // 这里 -10 是为了让滚动条不挡住内容部分
      this.minScrollX = -(contentW - this.tableW) - 10;
      this.contentW = contentW;
    },

    // calculate the content height of table
    _calculateTableContentHeight() {
      const $table = this.$refs.table;

      if (!$table) return;

      const rows = $table.querySelectorAll(`.${this._addPrefix('row')}`) || [];
      const totalH = rows.length
        ? Array.from(rows)
            .map(row => getHeight(row) || this.rowHeight)
            .reduce((x, y) => x + y)
        : 0;
      const contentH = totalH - this.headerH;

      if (this.contentH !== contentH) {
        this.scrollY = 0;
        this.$refs.scrollbarY && this.$refs.scrollbarY.resetScrollBarPosition();
      }

      if (this.height !== 'auto') {
        // 这里 -10 是为了让滚动条不挡住内容部分
        this.minScrollY = -(totalH - this.height) - 10;
      }

      this.contentH = contentH;
    },

    // calculate the max height of row of table
    _calculateRowMaxHeight() {
      if (!this.wordWrap) return;

      const $table = this.$refs.table;

      if (!$table) return;

      const $rows =
        $table.querySelectorAll(
          `.${this._addPrefix('row')}:not(.${this._addPrefix('row-header')})`
        ) || [];

      this.rowHeightMap = {};

      $rows.forEach(($row, i) => {
        const $cells =
          $row.querySelectorAll(`.${this._addPrefix('cell-wrap')}`) || [];
        let maxHeight = 0;
        const rowKey = this._getRowKey(this.data[i], i);

        $cells.forEach(
          $cell => (maxHeight = Math.max(maxHeight, getHeight($cell)))
        );

        this.rowHeightMap[rowKey] = maxHeight + CELL_PADDING_HEIGHT;
      });
    },

    _generateCells(h) {
      let left = 0; // Cell left margin
      let rightLeft = 0; // Cell for fixed right
      const headerCells = [[], [], []]; // Table header cell
      const bodyCells = []; // Table body cell

      if (!this.columnList || this.columnList.length <= 0) {
        return {
          headerCells,
          bodyCells,
          allColumnsWidth: left,
        };
      }

      const [
        totalFlex,
        totalWidth,
        totalFixedLeftWidth,
        totalFixedRightWidth,
      ] = this.columnList.reduce(
        (p, v, i) => {
          if (!this.columnWidthMap || !this.columnWidthMap[v.key]) {
            this.columnWidthMap = this.columnWidthMap || {};
            this.columnWidthMap[v.key] = v.minWidth;
          }

          const width = this.columnWidthMap[v.key];

          return [
            p[0] + (v.flex || 0),
            p[1] + (width || 0),
            p[2] + (v.fixed === 'left' ? width : 0),
            p[3] + (v.fixed === 'right' ? width : 0),
          ];
        },
        [0, 0, 0, 0]
      );

      this.totalFixedLeftWidth = totalFixedLeftWidth;
      this.totalFixedRightWidth = totalFixedRightWidth;

      this.columnList.forEach((column, index) => {
        const {
          key,
          title,
          dataIndex,
          minWidth,
          maxWidth,
          flex,
          align,
          resizable,
          fixed,
          render,
        } = column;
        let nextWidth = this.columnWidthMap[key];

        if (this.tableW > totalWidth && flex && totalFlex) {
          nextWidth += ((this.tableW - totalWidth) / totalFlex) * flex;
        }

        // FIXME: headerHeight 通过 columns 和默认高度计算得出
        const cellData = {
          splitProps: {
            index,
            left: fixed === 'right' ? rightLeft : left,
            width: nextWidth,
            height: this.headerH,
            firstColumn: index === 0,
            lastColumn: index === this.columnList.length - 1,
            // properties
            align,
            resizable,
            fixed,
          },
        };

        if (this.showHeader && this.headerH) {
          let headerCellData = _.merge(cellData, {
            key,
            splitProps: {
              columnKey: key,
              columnMinWidth: minWidth,
              columnMaxWidth: maxWidth,
              // dataKey: columnChildren[1].props.dataKey,
              // isHeaderCell: true,
              // sortable: column.props.sortable,
              // sortColumn,
              // sortType,
              // onSortColumn,
              // flexGrow
            },
          });

          if (resizable) {
            headerCellData = _.merge(headerCellData, {
              on: {
                resize: this._handleResize,
                'column-resize-start': this._handleResizeStart,
                'column-resize-move': this._handleResizeMove,
                'column-resize-end': this._handleResizeEnd,
              },
            });
          }

          headerCellData = splitDataByComponent(
            headerCellData,
            TableHeaderCell
          );

          const headerCell = (
            <TableHeaderCell {...headerCellData}>
              {_.isFunction(title) ? title(h) : title}
            </TableHeaderCell>
          );

          if (fixed === 'left') {
            headerCells[0].push(headerCell);
          } else if (fixed === 'right') {
            headerCells[2].push(headerCell);
          } else {
            headerCells[1].push(headerCell);
          }
        }

        this.data.forEach((d, i) => {
          if (!bodyCells[i]) {
            bodyCells[i] = [[], [], []];
          }

          const rowKey = this._getRowKey(d, i);
          const data = splitDataByComponent(
            _.merge(cellData, {
              key: `${rowKey}_${key}`,
              splitProps: {
                height: this.rowHeight,
                rowIndex: i,
                rowKey,
                rowDataKey: key,
                rowData: d,
              },
            }),
            TableCell
          );
          const bodyCell = (
            <TableCell {...data}>
              {render
                ? dataIndex
                  ? render(h, _.get(d, dataIndex), d, i)
                  : render(h, d, i)
                : _.get(d, dataIndex)}
            </TableCell>
          );

          if (fixed === 'left') {
            bodyCells[i][0].push(bodyCell);
          } else if (fixed === 'right') {
            bodyCells[i][2].push(bodyCell);
          } else {
            bodyCells[i][1].push(bodyCell);
          }
        });

        if (fixed === 'right') {
          rightLeft += nextWidth;
        } else {
          left += nextWidth;
        }
      });

      return {
        headerCells,
        bodyCells,
        totalWidth: left,
      };
    },

    // get row key
    _getRowKey(data, index) {
      if (_.isString(this.rowKey)) {
        return `${_.get(data, this.rowKey)}` || `${index}`;
      }

      if (_.isFunction(this.rowKey)) {
        return this.rowKey(data, index) || `${index}`;
      }

      return `${index}`;
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
