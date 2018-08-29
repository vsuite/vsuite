import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import SafeAnchor from 'components/SafeAnchor';
import Tooltip from 'components/Tooltip';
import Ripple from 'components/Ripple';
import Icon from 'components/Icon';

const CLASS_PREFIX = 'nav-item';

export default {
  name: 'NavItem',

  mixins: [popperMixin],

  props: {
    /* eslint-disable vue/require-prop-types */
    placement: {
      ...popperMixin.props.placement,
      default: 'right',
    },
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
    const btnData = splitDataByComponent(
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
    let liData = {
      class: this.classes,
      attrs: { role: 'presentation' },
    };

    if (this.tooltip) {
      const tooltipData = {
        directives: [
          { name: 'show', value: this.currentVisible },
          { name: 'transfer-dom' },
        ],
        props: {
          pure: true,
        },
        attrs: {
          'data-transfer': 'true',
        },
        ref: 'popper',
      };

      liData = _.merge(liData, {
        directives: [
          { name: 'click-outside', value: this._handleClickOutside },
        ],
        ref: 'reference',
      });

      this._addTriggerListeners(btnData, liData);

      return (
        <li {...liData}>
          <Component {...btnData}>
            {this.$slots.icon || (this.icon && <Icon icon={this.icon} />)}
            <span class={this._addPrefix('text')}>{this.$slots.default}</span>
            <Ripple />
          </Component>
          <transition name="tooltip-fade">
            <Tooltip {...tooltipData}>
              <template slot="title">{this.$slots.default}</template>
            </Tooltip>
          </transition>
        </li>
      );
    }

    return (
      <li {...liData}>
        <Component {...btnData}>
          {this.$slots.icon || (this.icon && <Icon icon={this.icon} />)}
          <span class={this._addPrefix('text')}>{this.$slots.default}</span>
          <Ripple />
        </Component>
      </li>
    );
  },

  methods: {
    _handleClick(event) {
      if (this.disabled) return;

      this.$emit('select', this.eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
