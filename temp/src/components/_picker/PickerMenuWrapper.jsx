import VueTypes from 'vue-types';
import { addStyle, getWidth } from 'dom-lib';
import onResize, { unbind } from 'element-resize-event';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'picker-menu';

export default {
  name: 'PickerMenuWrapper',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    autoWidth: VueTypes.bool,
    getToggleInstance: VueTypes.func,
  },

  computed: {
    toggleElm() {
      const instance = this.getToggleInstance && this.getToggleInstance();

      return instance && instance.$el;
    },
  },

  mounted() {
    if (this.autoWidth) {
      this._updateMenuStyle();
    }

    if (this.toggleElm) {
      onResize(this.toggleElm, this._handleResize);
    }
  },

  beforeDestroy() {
    if (this.toggleElm) {
      unbind(this.toggleElm);
    }
  },

  render() {
    const data = {
      class: this.classPrefix,
      attrs: this.$attrs,
      on: this.$listeners,
      ref: 'menu',
    };

    return <div {...data}>{this.$slots.default}</div>;
  },

  methods: {
    _handleResize() {
      this._updateMenuStyle();
    },

    _updateMenuStyle() {
      if (this.$refs.menu && this.toggleElm) {
        const width = getWidth(this.toggleElm);

        addStyle(this.$refs.menu, 'min-width', `${width}px`);
      }
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
