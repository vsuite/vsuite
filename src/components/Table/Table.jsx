import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import invariant from 'utils/invariant';

import TableCell from './TableCell.jsx';
import TableHeaderCell from './TableHeaderCell.jsx';

import { formatColumns } from './utils';

const CLASS_PREFIX = 'table';

export default {
  name: 'Table',

  props: {
    width: VueTypes.number,
    height: VueTypes.number.def(200),
    minHeight: VueTypes.number,
    rowHeight: VueTypes.number.def(46),
    rowExpandedHeight: VueTypes.number.def(200),
    headerHeight: VueTypes.number.def(40),
    autoHeight: VueTypes.bool.def(false),
    disabledScroll: VueTypes.bool.def(false),
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
      return this.autoHeight
        ? Math.max(this.headerH + this.contentH, this.minHeight)
        : this.height;
    },

    // format columns
    columnList() {
      return formatColumns(this.columns);
    },
  },

  render(h) {
    // const { headerCells, bodyCells, allColumnsWidth } = this._generateCells();
    // const rowWidth =
    //   allColumnsWidth > this.width ? allColumnsWidth : this.width;

    // console.dir(this.columnList);

    const children = this.$slots.default;
    const { headerCells, bodyCells, allColumnsWidth } = this._generateCells();
    const rowWidth =
      allColumnsWidth > this.width ? allColumnsWidth : this.width;
    const style = {
      width: this.width || 'auto',
      height: this.tableH,
    };

    return (
      <div class={this.classes} style={style}>
        {this.showHeader && this._renderTableHeader(h, headerCells, rowWidth)}
        {children && this._renderTableBody(h, bodyCells, rowWidth)}
        {this.showHeader && this._renderMouseArea(h)};
      </div>
    );
  },

  methods: {
    _renderTableHeader() {},

    _renderMouseArea() {},

    _renderTableBody() {},

    _generateCells() {
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
        const { key, width, minWidth, resizable, flex } = column;

        invariant.not(
          resizable && flex,
          `Cannot set 'resizable' and 'flex' together, column index: ${index}`
        );

        let nextWidth = this[`${key}_${index}_width`] || width || 0;

        if (this.tableW && flex && totalFlex) {
          nextWidth = Math.max(
            ((this.tableW - totalWidth) / totalFlex) * flex,
            minWidth || 60
          );
        }

        // FIXME: headerHeight 通过 columns 和默认高度计算得出
        if (this.showHeader && this.headerHeight) {
          const headerCellData = {
            key: index,
            props: {
              index,
              left,
              width: nextWidth,
              height: this.headerHeight,
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

          headerCells.push(<TableHeaderCell {...headerCellData} />);
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
