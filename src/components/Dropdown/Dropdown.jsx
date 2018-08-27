import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import DropdownToggle from './DropdownToggle.jsx';
import DropdownMenu from './DropdownMenu.jsx';

const CLASS_PREFIX = 'dropdown';

export default {
  name: 'Dropdown',

  mixins: [popperMixin],

  props: {
    /* eslint-disable vue/require-prop-types */
    placement: {
      ...popperMixin.props.placement,
      default: 'bottom-start',
    },
    trigger: {
      ...popperMixin.props.trigger,
      default: 'click',
    },
    activeKey: VueTypes.any,
    title: VueTypes.string, // slot
    icon: VueTypes.string, // slot
    disabled: VueTypes.bool.def(false),
    noCaret: VueTypes.bool.def(false),
    tabindex: VueTypes.number,
    menuStyle: VueTypes.object,
    toggleClassName: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    toggleComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]).def(() => undefined),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
    // close, open, toggle, select
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(`placement-${this.placement}`),
        {
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('no-caret')]: this.noCaret,
          [this._addPrefix('open')]: this.currentVisible,
          // [addPrefix(menuExpanded ? 'expand' : 'collapse')]: sidenav
        },
      ];
    },
  },

  render(h) {
    const Component = this.componentClass;
    const dropdownData = splitDataByComponent(
      {
        class: this.classes,
        splitProps: { role: 'menu' },
        directives: [
          { name: 'click-outside', value: this._handleClickOutside },
        ],
        on: {},
        ref: 'container',
      },
      Component
    );
    const referenceData = {
      class: this._addPrefix('rel'),
      on: {},
      ref: 'reference',
    };
    const popperData = {
      class: [this._addPickerPrefix('menu')],
      style: {},
      directives: [
        {
          name: 'show',
          value: this.currentVisible,
        },
        { name: 'transfer-dom' },
      ],
      attrs: {
        'data-transfer': `${this.transfer}`,
      },
      ref: 'popper',
    };

    if (!this.disabled) {
      this._addTriggerListeners(referenceData, dropdownData);
    }

    return (
      <Component {...dropdownData}>
        <div {...referenceData}>{this._renderToggle(h)}</div>
        <transition name="picker-fade">
          {this._renderMenu(h, popperData)}
        </transition>
      </Component>
    );
  },

  methods: {
    _renderToggle() {
      const data = splitDataByComponent(
        {
          class: this.toggleClassName,
          splitProps: {
            ...this.$attrs,
            icon: this.icon,
            noCaret: this.noCaret,
            disabled: this.disabled,
            tabindex: this.tabindex,
            componentClass: this.toggleComponentClass,
          },
        },
        DropdownToggle
      );

      return (
        <DropdownToggle {...data}>
          {this.title}
          {this.$slots.title && (
            <template slot="title">{this.$slots.title}</template>
          )}
          {this.$slots.icon && (
            <template slot="icon">{this.$slots.icon}</template>
          )}
        </DropdownToggle>
      );
    },

    _renderMenu(h, popperData) {
      const data = _.merge(popperData, {
        style: this.menuStyle,
        props: {
          activeKey: this.activeKey,
        },
        on: {
          select: this._handleSelect,
        },
      });

      return <DropdownMenu {...data}>{this.$slots.default}</DropdownMenu>;
    },

    _handleSelect(eventKey, event) {
      this._closePopper();

      this.$emit('select', eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    _addPickerPrefix(cls) {
      return prefix(defaultClassPrefix('picker'), cls);
    },
  },
};
