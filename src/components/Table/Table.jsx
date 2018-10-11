import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

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

  render() {
    return null;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
