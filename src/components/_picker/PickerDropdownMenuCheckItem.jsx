import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerDropdownMenuCheckItem',

  props: {
    value: VueTypes.any,
    // title: VueTypes.string,
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    focus: VueTypes.bool.def(false),
    checkable: VueTypes.bool,
    // getItemData: Function,

    labelComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]).def('label'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot

    // @check
    // @select
    // @selectItem
    // @keydown
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
    const Label = this.labelComponentClass;
    const data = {
      attrs: { ...this.$attrs, role: 'menuitem' },
      role: 'menuitem',
    };
    const labelProps = {
      class: this.classes,
      attrs: { tabindex: -1, role: 'presentation' },
      on: { click: this._handleClick, keydown: this._handleKeydown },
    };
    const iptProps = {
      domProps: { checked: this.active },
      attrs: { type: 'checkbox', disabled: this.disabled },
      on: { input: this._handleChange },
    };

    return (
      <li {...data}>
        <div class={this._addPrefix('checker')}>
          <Label {...labelProps}>
            {this.checkable ? (
              <span
                class={this._addPrefix('wrapper')}
                onClick={this._handleCheck}
              >
                <input {...iptProps} />
                <span class={this._addPrefix('inner')} />
              </span>
            ) : null}
            {this.$slots.default}
          </Label>
        </div>
      </li>
    );
  },

  methods: {
    _handleCheck(event) {
      if (this.disabled) return;

      this.$emit('check', this.value, event, !this.active);
    },

    _handleClick(event) {
      event.stopPropagation();

      if (this.disabled) return;

      // this.$emit('select-item', this.value, event, !this.active);
      this.$emit('click', this.value, event, !this.active);
    },

    _handleChange(event) {
      if (this.disabled) return;

      const checked = event.target.checked;

      event.target.checked = this.active;

      this.$emit('select', this.value, event, checked);
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
