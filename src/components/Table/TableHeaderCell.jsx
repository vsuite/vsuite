import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'table-cell-header';

export default {
  name: 'TableHeaderCell',

  props: {
    index: VueTypes.number,
    left: VueTypes.number,
    flex: VueTypes.number,
    width: VueTypes.number,
    height: VueTypes.number.def(36),
    fixed: VueTypes.bool.def(false),
    sortType: VueTypes.oneOf(['asc', 'desc', '']).def(''),
    sortable: VueTypes.bool.def(false),
    filterable: VueTypes.bool.def(false),
    filters: VueTypes.array.def([]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // onSort
    // onResizeStart, onResizeEnd, onResize
    // onFilter
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('sortable')]: this.sortable,
          [this._addPrefix('filterable')]: this.filterable,
        },
      ];
    },
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
