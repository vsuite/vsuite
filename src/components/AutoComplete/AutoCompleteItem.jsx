import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'auto-complete-item';

export default {
  name: 'AutoCompleteItem',

  props: {
    focus: VueTypes.bool.def(false),
    itemData: VueTypes.shape({ label: VueTypes.any, value: VueTypes.any }),
    renderItem: VueTypes.func,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // select keydown
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
