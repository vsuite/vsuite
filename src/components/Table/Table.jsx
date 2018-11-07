import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import WheelHandler from 'utils/WheelHandler';
import invariant from 'utils/invariant';
import { getWidth, getHeight } from 'shares/dom';
import onResize from 'element-resize-event';

import TableRow from './TableRow.jsx';
import TableCell from './TableCell.jsx';
import TableCellGroup from './TableCellGroup.jsx';
import TableHeaderCell from './TableHeaderCell.jsx';
import TableScrollbar from './TableScrollbar.jsx';

import { formatColumns } from './utils';
import { TABLE_DEFAULT_HEIGHT } from './constants';

const CLASS_PREFIX = 'table';

export default {
  name: 'Table',

  props: {
    width: VueTypes.number,
    height: VueTypes.custom(v => {
      if (typeof v === 'number') return true;
      if (typeof v === 'string' && v === 'auto') return true;

      return false;
    }, '`height` must be a number or string `auto`').def(TABLE_DEFAULT_HEIGHT),
    minHeight: VueTypes.number,
    maxHeight: VueTypes.number,
    scrollbar: VueTypes.bool,
    hover: VueTypes.bool,
    loading: VueTypes.bool.def(false),
    loadAnimation: VueTypes.bool.def(false),
    bordered: VueTypes.bool.def(false),
    cellBordered: VueTypes.bool.def(false),
    wordWrap: VueTypes.bool.def(false),
    showHeader: VueTypes.bool,
    data: VueTypes.arrayOf(VueTypes.object).def([]),
    dataKey: VueTypes.string,
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

      minScrollX: 0,
      minScrollY: 0,

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
          // [this._addPrefix('column-resizing')]: isColumnResizing,
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
        ? Math.max(this.headerH + this.contentH, this.minHeight)
        : this.height;
    },

    // format columns
    columnList() {
      return formatColumns(this.columns);
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

  render(h) {
    // const { headerCells, bodyCells, allColumnsWidth } = this._generateCells();
    // const rowWidth =
    //   allColumnsWidth > this.width ? allColumnsWidth : this.width;

    // console.dir(this.columnList);
    const { headerCells, bodyCells, allColumnsWidth } = this._generateCells(h);
    const rowWidth =
      allColumnsWidth > this.width ? allColumnsWidth : this.width;
    const styles = {
      width: this.width ? `${this.width}px` : 'auto',
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
          {this._renderRow(h, data, cells)}
        </div>
      );
    },

    _renderTableBody(h, cells, rowWidth) {
      if (!this.columnList.length) return null;

      // let top = 0;
      let bodyHeight = 0;
      let rows = null;

      const bodyStyles = {
        top: `${this.headerH}px`,
        height: `${this.tableH - this.headerH}px`,
      };

      const wheelStyles = {
        position: 'absolute',
        height: `${bodyHeight}px`,
        minHeight: `${this.tableH}px`,
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

    _renderRow(h, data, cells, shouldRenderExpanded, rowData) {
      return (
        <TableRow {...data}>
          <TableCellGroup>{cells}</TableCellGroup>
          {/* TODO: renderExpand */}
        </TableRow>
      );
    },

    _renderScrollbar(h) {
      if (!this.scrollbar) {
        return null;
      }

      return (
        <div>
          <TableScrollbar
            ref="scrollbarX"
            length={this.tableW}
            scrollLength={this.contentW}
            onScroll={this._handleScrollX}
          />
          <TableScrollbar
            ref="scrollbarY"
            vertical
            length={this.tableH - this.headerH}
            scrollLength={this.contentH}
            onScroll={this._handleScrollY}
          />
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

    _handleTouchStart() {},

    _handleTouchMove() {},

    _handleScrollX() {},

    _handleScrollY() {},

    _shouldHandleWheelX() {},

    _shouldHandleWheelY() {},

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
      this.minScrollX = -(contentW - this.contentW) - 10;
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
    _calculateRowMaxHeight() {},

    _generateCells(h) {
      let left = 0; // Cell left margin
      const headerCells = []; // Table header cell
      const bodyCells = []; // Table body cell

      if (!this.columnList || this.columnList.length <= 0) {
        return {
          headerCells,
          bodyCells,
          allColumnsWidth: left,
        };
      }

      const [totalFlex, totalWidth] = this.columnList.reduce(
        (p, v) => [p[0] + v.flex || 0, p[1] + v.width || 0],
        [0, 0]
      );

      this.columnList.forEach((column, index) => {
        const {
          title,
          key,
          width,
          minWidth,
          resizable,
          flex,
          renderTitle,
        } = column;

        invariant.not(
          resizable && flex,
          `[Table] COLUMN ${index}: cannot set 'resizable' and 'flex' together`
        );

        invariant.not(
          renderTitle && !_.isFunction(renderTitle),
          `[Table] column ${index}: 'renderTitle' should be a function`
        );

        let nextWidth = this[`${key}_${index}_width`] || width || 0;

        if (this.tableW && flex && totalFlex) {
          nextWidth = Math.max(
            ((this.tableW - totalWidth) / totalFlex) * flex,
            minWidth || 60
          );
        }

        // FIXME: headerHeight 通过 columns 和默认高度计算得出
        if (this.showHeader && this.headerH) {
          const headerCellData = {
            key: index,
            props: {
              index,
              left,
              width: nextWidth,
              height: this.headerH,
              firstColumn: index === 0,
              lastColumn: index === this.columnList.length - 1,
            },
            // dataKey: columnChildren[1].props.dataKey,
            // isHeaderCell: true,
            // sortable: column.props.sortable,
            // sortColumn,
            // sortType,
            // onSortColumn,
            // flexGrow
          };
          //
          // if (resizable) {
          //   // _.merge(headerCellProps, {
          //   //   onResize,
          //   //   onColumnResizeEnd: this.handleColumnResizeEnd,
          //   //   onColumnResizeStart: this.handleColumnResizeStart,
          //   //   onColumnResizeMove: this.handleColumnResizeMove
          //   // });
          // }

          headerCells.push(
            <TableHeaderCell {...headerCellData}>
              {renderTitle ? renderTitle(h, this.data, index) : title}
            </TableHeaderCell>
          );
        }

        const cellData = {
          props: {
            index,
            left,
            width: nextWidth,
            height: this.rowHeight,
            firstColumn: index === 0,
            lastColumn: index === this.columnList.length - 1,
          },
        };

        this.data.forEach((d, rowIndex) => {
          if (!bodyCells[rowIndex]) {
            bodyCells[rowIndex] = [];
          }

          const data = _.merge(cellData, {
            key: this.dataKey ? _.get(d, this.dataKey) : `${rowIndex}-${index}`,
            props: {
              rowIndex: rowIndex,
              rowKey: key,
              rowData: d,
            },
          });

          bodyCells[rowIndex].push(<TableCell {...data} />);
        });

        left += nextWidth;
      });

      return {
        headerCells,
        bodyCells,
        allColumnsWidth: left,
      };
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
