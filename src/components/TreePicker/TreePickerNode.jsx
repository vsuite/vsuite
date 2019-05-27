import VueTypes from 'vue-types';
import _ from 'lodash';
import { vueToString } from 'utils/node';
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
    // branch: VueTypes.bool.def(false),
    // focus: VueTypes.bool.def(false),
    visible: VueTypes.bool,
    expand: VueTypes.bool.def(false),
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    hasChildren: VueTypes.bool.def(false),
    renderTreeIcon: Function,
    renderTreeNode: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot-scoped-icon
    // slot-scoped-node
  },

  computed: {
    classes() {
      return [
        this._addPrefix('node'),
        {
          'text-muted': this.disabled,
          // [this._addPrefix('node-branch')]: this.branch,
          // [this._addPrefix('node-focus')]: this.focus,
          [this._addPrefix('node-active')]: this.active,
          [this._addPrefix('node-disabled')]: this.disabled,
        },
      ];
    },

    title() {
      if (_.isString(this.label)) {
        return this.label;
      } else if (_.isObject(this.label)) {
        return vueToString(this.label).join('');
      } else {
        return '';
      }
    },
  },

  render(h) {
    const style = {
      paddingLeft: `${this.layer * PADDING + INITIAL_PADDING}px`,
    };

    return this.visible ? (
      <div style={style} class={this.classes}>
        {this._renderIcon(h)}
        {this._renderLabel(h)}
      </div>
    ) : null;
  },

  methods: {
    _renderIcon(h) {
      const expandIconClasses = [
        'icon',
        this._addPrefix('node-expand-icon'),
        { [this._addPrefix('node-expanded')]: this.expand },
      ];
      let expandIcon = <i class={expandIconClasses} />;

      if (this.$scopedSlots['tree-icon'] || this.renderTreeIcon) {
        const customIcon = this.$scopedSlots['tree-icon']
          ? this.$scopedSlots['tree-icon']({ data: this.node.data })
          : this.renderTreeIcon
          ? this.renderTreeIcon(h, this.node.data)
          : null;

        expandIcon = customIcon ? (
          <div class={this._addPrefix('custom-icon')}>{customIcon}</div>
        ) : (
          expandIcon
        );
      }

      const data = {
        class: this._addPrefix('node-expand-icon-wrapper'),
        attrs: { role: 'button', tabindex: -1, 'data-ref': this.node.key },
        on: { click: this._handleToggle },
      };

      return this.hasChildren ? <div {...data}>{expandIcon}</div> : null;
    },

    _renderLabel(h) {
      const newLabel = this.$scopedSlots['tree-node']
        ? this.$scopedSlots['tree-node']({ data: this.node.data })
        : this.renderTreeNode
        ? this.renderTreeNode(h, this.node.data)
        : this.label;

      const data = {
        class: this._addPrefix('node-label'),
        attrs: {
          role: 'button',
          tabindex: -1,
          title: this.title,
          'data-layer': this.layer,
          'data-key': this.node.key,
        },
        on: { click: this._handleSelect },
      };

      return <span {...data}>{newLabel}</span>;
    },

    _handleToggle(event) {
      event.stopPropagation();

      this.$emit('toggle', this.node, this.layer, event);
    },

    _handleSelect(event) {
      event.stopPropagation();

      if (this.disabled) return;

      // FIXME
      this.$emit('select', this.node, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
