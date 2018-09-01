import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerDropdownMenuItem',

  props: {
    value: VueTypes.any,
    // title: VueTypes.string,
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    focus: VueTypes.bool.def(false),
    // getItemData: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('focus')]: this.focus,
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
  },

  render() {
    const data = {
      attrs: {
        ...this.$attrs,
        role: 'menuitem',
      },
    };
    const aData = {
      class: this.classes,
      attrs: {
        role: 'presentation',
        tabindex: -1,
      },
      on: {
        keydown: this._handleKeydown,
        click: this._handleClick,
      },
    };

    return (
      <li {...data}>
        <a {...aData}>{this.$slots.default}</a>
      </li>
    );
  },

  methods: {
    _handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      if (this.disabled) return;

      this.$emit('select', this.value, event);
    },

    _handleKeydown(event) {
      if (this.disabled) return;

      this.$emit('keydown', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
