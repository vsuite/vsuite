import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = '';
const INITIAL_PADDING = 12;
const PADDING = 16;

export default {
  name: 'TreePickerNode',

  props: {
    node: VueTypes.object,
    layer: VueTypes.number,
    value: VueTypes.any,
    label: VueTypes.any,
    branch: VueTypes.bool.def(false),
    focus: VueTypes.bool.def(false),
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    renderTreeIcon: Function,
    renderTreeNode: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this._addPrefix('node'),
        {
          'text-muted': this.disabled,
          [this._addPrefix('node-branch')]: this.branch,
          [this._addPrefix('node-focus')]: this.focus,
          [this._addPrefix('node-active')]: this.active,
          [this._addPrefix('node-disabled')]: this.disabled,
        },
      ];
    },
  },

  render(h) {
    const style = {
      paddingLeft: `${this.layer * PADDING + INITIAL_PADDING}px`,
    };

    return (
      <div style={style} class={this.classes}>
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
      let newLabel = this.label;

      if (this.renderTreeNode) {
        newLabel = this.renderTreeNode(h, this.node.data);
      }

      const data = {
        class: this._addPrefix('node-label'),
        attrs: {
          role: 'button',
          tabindex: -1,
          title: this.label,
        },
        on: { click: this._handleSelect },
      };

      return <span {...data}>{newLabel}</span>;
    },

    _handleToggle(event) {
      event.stopPropagation();

      this.$emit('toggle', this.node, event);
    },

    _handleSelect(event) {
      event.stopPropagation();

      if (this.disabled) return;

      this.branch
        ? this.$emit('toggle', this.node, event)
        : this.$emit('select', this.node, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
