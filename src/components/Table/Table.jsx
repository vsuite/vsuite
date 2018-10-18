import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import invariant from 'utils/invariant';

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
  },

  render() {
    // const { headerCells, bodyCells, allColumnsWidth } = this._generateCells();
    // const rowWidth =
    //   allColumnsWidth > this.width ? allColumnsWidth : this.width;

    return null;
  },

  methods: {
    _generateCells() {
      let left = 0; // Cell left margin
      const headerCells = []; // Table header cell
      const bodyCells = []; // Table body cell

      if (!this.columns || this.columns.length <= 0) {
        return {
          headerCells,
          bodyCells,
          allColumnsWidth: left,
        };
      }

      this.columns.forEach((column, index) => {
        const { resizable, flex } = column;

        invariant.not(
          resizable && flex,
          `Cannot set 'resizable' and 'flex' together, column index: ${index}`
        );
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
