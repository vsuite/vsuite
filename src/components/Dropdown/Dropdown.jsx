import VueTypes from 'vue-types';
import Popper from 'popper.js';
import popperMixin from 'mixins/popper';
import renderX, { RenderX } from 'utils/render';
import { IconX } from 'utils/svg';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import shallowEqual from 'utils/shallowEqual';
import { mergeData } from 'utils/merge';

import { Fade } from 'components/Animation';
import DropdownToggle from './DropdownToggle.jsx';
import DropdownMenu from './DropdownMenu.jsx';

const CLASS_PREFIX = 'dropdown';

export default {
  name: 'Dropdown',

  mixins: [popperMixin],

  inject: {
    $vNav: { from: '$vNav', default: false },
    $vSidenav: { from: '$vSidenav', default: false },
  },

  props: {
    /* eslint-disable vue/require-prop-types */
    placement: VueTypes.oneOf(
      Popper.placements.filter(x => !/^auto/.test(x))
    ).def('bottom-start'),
    trigger: {
      ...popperMixin.props.trigger,
      default() {
        const sidenav = !!this.$vSidenav;

        if (sidenav) return 'hover';

        return 'click';
      },
    },
    activeKey: VueTypes.any,
    title: RenderX,
    icon: IconX,
    disabled: VueTypes.bool.def(false),
    noCaret: VueTypes.bool.def(false),

    eventKey: VueTypes.any,
    menuStyle: VueTypes.object,
    toggleClassName: VueTypes.string,
    toggleComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]).def(() => undefined),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),

    tabindex: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
    // slot-icon
    // slot-title

    // @toggle
    // @select

    // @show
    // @hide
    // @visible-change
  },

  computed: {
    openKeys() {
      return (this.$vSidenav && this.$vSidenav.currentOpenKeys) || [];
    },

    expanded() {
      return this.openKeys.some(key => shallowEqual(key, this.eventKey));
    },

    collapsible() {
      return this.$vSidenav && this.$vSidenav.expanded;
    },

    sidenav() {
      return !!this.$vSidenav;
    },

    classes() {
      return [
        this.classPrefix,
        this._addPrefix(`placement-${this.placement}`),
        {
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('no-caret')]: this.noCaret,
          [this._addPrefix('open')]: this.currentVisible,
          [this._addPrefix(this.expanded ? 'expand' : 'collapse')]: this
            .sidenav,
        },
      ];
    },
  },

  render(h) {
    const Component = this.componentClass;
    let dropdownData = splitDataByComponent(
      {
        class: this.classes,
        splitProps: { role: 'menu' },
      },
      Component
    );
    let referenceData = {};
    let popperData = {};

    if (!this.collapsible) {
      dropdownData = mergeData(dropdownData, {
        directives: [
          { name: 'click-outside', value: this._handleClickOutside },
        ],
      });

      referenceData = mergeData(referenceData, { ref: 'reference' });

      popperData = mergeData(popperData, {
        directives: [
          { name: 'show', value: this.currentVisible },
          { name: 'transfer-dom' },
        ],
        attrs: { 'data-transfer': `${this.transfer}` },
        ref: 'popper',
      });

      if (!this.disabled) {
        this._addTriggerListeners(referenceData, dropdownData);
      }
    }

    return (
      <Component {...dropdownData}>
        {this._renderMenu(h, popperData)}
        {this._renderToggle(h, referenceData)}
      </Component>
    );
  },

  methods: {
    _renderToggle(h, referenceData) {
      const data = mergeData(
        referenceData,
        splitDataByComponent(
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
            on: { click: event => this._handleToggle(this.eventKey, event) },
          },
          DropdownToggle
        )
      );

      return (
        <DropdownToggle {...data}>
          {renderX(h, this.title)}
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
      const data = mergeData(popperData, {
        style: this.menuStyle,
        props: {
          activeKey: this.activeKey,
          sidenav: this.sidenav,
          expanded: this.expanded,
          collapsible: this.collapsible,
          openKeys: this.openKeys,
        },
        on: {
          toggle: this._handleToggle,
          select: this._handleSelect,
        },
      });
      const menu = <DropdownMenu {...data}>{this.$slots.default}</DropdownMenu>;

      return !this.collapsible ? <Fade>{menu}</Fade> : menu;
    },

    _handleToggle(eventKey, event) {
      // If there is no sidenav, we don't need to trigger toggle event
      if (!this.sidenav) return;
      // If sidenav is collapsed, we also don't need to trigger toggle event
      if (this.$vSidenav && !this.$vSidenav.expanded) return;

      this.$emit('toggle', eventKey, event);
      this.$vSidenav && this.$vSidenav._handleOpenChange(eventKey, event);
    },

    _handleSelect(eventKey, event) {
      this._closePopper();

      this.$emit('select', eventKey, event);

      // Nav will pass select event to dropdown, do not re-trigger this event
      !this.$vNav &&
        this.$vSidenav &&
        this.$vSidenav._handleSelect(eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
