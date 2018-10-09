import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = '';

export default {
  name: 'TableCell',

  props: {
    align: VueTypes.oneOf(['left', 'center', 'right']).def('left'),
    dataKey: VueTypes.string,
    left: Number,
    width: Number,
    minWidth: Number,
    maxWidth: Number,
    height: VueTypes.number.def(36),
    headerHeight: VueTypes.number.def(36),
    firstColumn: VueTypes.bool.def(false),
    lastColumn: VueTypes.bool.def(false),
    hasChildren: VueTypes.bool.def(false),
    rowKey: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    rowIndex: VueTypes.number,
    rowData: VueTypes.object,
    layer: VueTypes.number,
    isHeader: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
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
