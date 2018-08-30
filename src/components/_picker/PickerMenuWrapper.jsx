import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerMenuWrapper',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const data = {
      class: this._addPrefix('menu'),
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <div {...data}>{this.$slots.default}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
