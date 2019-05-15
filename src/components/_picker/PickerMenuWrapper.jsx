import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { addStyle, getWidth } from 'dom-lib';

const CLASS_PREFIX = 'picker-menu';

export default {
  name: 'PickerMenuWrapper',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    autoWidth: VueTypes.bool,
    getToggleInstance: VueTypes.func,
  },

  mounted() {
    if (this.autoWidth) {
      this._updateMenuStyle();
    }
  },

  render() {
    const data = {
      class: this.classPrefix,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <div {...data}>{this.$slots.default}</div>;
  },

  methods: {
    _updateMenuStyle() {
      if (this.$refs.menu && this.getToggleInstance) {
        const instance = this.getToggleInstance();

        if (instance && instance.toggle) {
          const width = getWidth(instance.toggle);

          addStyle(this.$refs.menu, 'min-width', `${width}px`);
        }
      }
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
