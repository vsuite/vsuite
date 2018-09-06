import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { CHECK_STATUS } from './constants';

const CLASS_PREFIX = 'prefix';
const INITIAL_PADDING = 12;
const PADDING = 16;

export default {
  name: 'CheckTreePickerNode',

  props: {
    node: VueTypes.object,
    layer: VueTypes.number,
    value: VueTypes.any,
    label: VueTypes.any,
    status: {
      type: Number,
      default: undefined,
    },
    focus: VueTypes.bool.def(false),
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledCheckbox: VueTypes.bool.def(false),
    renderTreeIcon: Function,
    renderTreeNode: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // toggle, select
  },

  computed: {
    classes() {
      return [
        this._addPrefix('node'),
        {
          'text-muted': this.disabled,
          [this._addPrefix('indeterminate')]:
            this.status === CHECK_STATUS.INDETERMINATE,
          [this._addPrefix('checked')]: this.status === CHECK_STATUS.CHECKED,
          [this._addPrefix('focus')]: this.focus,
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('disabled-checkbox')]: this.disabledCheckbox,
        },
      ];
    },
  },

  render(h) {
    const styles = {
      paddingLeft: `${this.layer * PADDING + INITIAL_PADDING}px`,
    };

    return (
      <div style={styles} class={this.classes}>
        {this._renderIcon(h)}
        {this._renderLabel(h)}
      </div>
    );
  },

  methods: {
    _renderIcon(h) {
      let expandIcon = (
        <i class={['icon', this._addPrefix('node-expand-icon')]} />
      );

      if (this.renderTreeIcon) {
        const customIcon = this.renderTreeIcon(h, this.node.data);

        expandIcon = customIcon ? (
          <div class={this._addPrefix('custom-icon')}>{customIcon}</div>
        ) : (
          expandIcon
        );
      }

      const data = {
        class: this._addPrefix('node-expand-icon-wrapper'),
        attrs: {
          role: 'button',
          tabindex: -1,
        },
        on: { click: this._handleToggle },
      };

      return this.node && this.node.children ? (
        <div {...data}>{expandIcon}</div>
      ) : null;
    },

    _renderLabel(h) {
      const disabledCheckbox = this.disabledCheckbox || this.branch;
      const custom = this.renderTreeNode
        ? this.renderTreeNode(h, this.node.data)
        : this.label;
      const input = (
        <span class={this._addPrefix('input-wrapper')}>
          <input
            class={this._addPrefix('input')}
            type="checkbox"
            disabled={this.disabled}
            onInput={this._handleChange}
          />
          <span class={this._addPrefix('inner')} />
        </span>
      );
      const data = {
        class: this._addPrefix('checknode-label'),
        attrs: { role: 'button', tabindex: -1 },
        on: { click: this._handleClick },
      };

      return (
        <span {...data}>
          {!disabledCheckbox ? input : null}
          {custom}
        </span>
      );
    },

    _handleClick() {},

    _handleChange(event) {
      event.stopPropagation();
    },

    _handleToggle() {
      event.stopPropagation();

      this.$emit('toggle', this.node, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
