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
      attrs: { ...this.$attrs, role: 'menuitem' },
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
          <label {...labelProps}>
            <span class={this._addPrefix('wrapper')}>
              <input {...iptProps} />
              <span class={this._addPrefix('inner')} />
            </span>
            {this.$slots.default}
          </label>
        </div>
      </li>
    );
  },

  methods: {
    _handleClick(event) {
      event.stopPropagation();

      this.$emit('click', event);
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
