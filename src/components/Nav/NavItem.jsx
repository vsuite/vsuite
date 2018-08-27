import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import SafeAnchor from 'components/SafeAnchor';
import Tooltip from 'components/Tooltip';
import Ripple from 'components/Ripple';
import Icon from 'components/Icon';

const CLASS_PREFIX = 'nav-item';

export default {
  name: 'NavItem',

  props: {
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    divider: VueTypes.bool.def(false),
    panel: VueTypes.bool.def(false),
    tooltip: VueTypes.bool.def(false),
    icon: VueTypes.string,
    eventKey: VueTypes.any,
    tabindex: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      SafeAnchor
    ),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
  },

  render(h) {
    if (this.divider) {
      return <li class={this._addPrefix('divider')} role="separator" />;
    }

    if (this.panel) {
      return <li class={this._addPrefix('panel')}>{this.$slots.default}</li>;
    }

    const Component = this.componentClass;
    const data = splitDataByComponent(
      {
        class: this._addPrefix('content'),
        splitProps: {
          ...this.$attrs,
          role: 'button',
          tabindex: this.tabindex,
        },
        on: {
          ...this.$listeners,
          click: this._handleClick,
        },
      },
      Component
    );
    const item = (
      <Component {...data}>
        {this.$slots.icon || (this.icon && <Icon icon={this.icon} />)}
        <span class={this._addPrefix('text')}>{this.$slots.default}</span>
        <Ripple />
      </Component>
    );

    return (
      <li class={this.classes} role="presentation">
        {this.tooltip
          ? this._renderWithTooltip(h, item, this.$slots.default)
          : item}
      </li>
    );
  },

  methods: {
    _renderWithTooltip(h, item, children) {
      return (
        <Tooltip placement="right">
          {children}
          <template slot="content">{item}</template>
        </Tooltip>
      );
    },

    _handleClick(event) {
      if (this.disabled) return;

      this.$emit('select', this.eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
