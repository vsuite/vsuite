import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Checkbox from 'components/Checkbox';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerDropdownMenuCheckItem',

  props: {
    value: VueTypes.any,
    // title: VueTypes.string,
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    focus: VueTypes.bool.def(false),
    // getItemData: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // select, keydown
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
    const checkProps = {
      class: this.classes,
      props: {
        checked: this.active,
        disabled: this.disabled,
        value: this.value,
      },
      attrs: {
        tabindex: -1,
        role: 'presentation',
      },
      on: { change: this._handleChange, keydown: this._handleKeydown },
    };

    return (
      <li {...data}>
        <Checkbox {...checkProps}>{this.$slots.default}</Checkbox>
      </li>
    );
  },

  methods: {
    _handleChange(checked, value, event) {
      if (this.disabled) return;

      this.$emit('select', checked, value, event);
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
