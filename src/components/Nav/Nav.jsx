import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix, globalKey } from 'utils/prefix';
import { cloneElement, getName, getProps } from 'utils/node';
import shallowEqual from 'utils/shallowEqual';

const CLASS_PREFIX = 'nav';

export default {
  name: 'Nav',

  provide() {
    return {
      $vNav: this,
    };
  },

  inject: {
    $vNavbar: { from: '$vNavbar', default: false },
    $vSidenav: { from: '$vSidenav', default: false },
  },

  props: {
    appearance: VueTypes.oneOf(['default', 'subtle', 'tabs']).def('default'),
    reversed: VueTypes.bool.def(false),
    justified: VueTypes.bool.def(false),
    vertical: VueTypes.bool.def(false),
    pullRight: VueTypes.bool.def(false),
    activeKey: VueTypes.any,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      const navbar = !!this.$vNavbar;
      const sidenav = !!this.$vSidenav;

      return [
        this.classPrefix,
        this._addPrefix(this.appearance),
        {
          [`${globalKey}navbar-nav`]: navbar,
          [`${globalKey}navbar-right`]: this.pullRight,
          [`${globalKey}sidenav-nav`]: sidenav,
          [this._addPrefix('horizontal')]:
            navbar || (!this.vertical && !sidenav),
          [this._addPrefix('vertical')]: this.vertical || sidenav,
          [this._addPrefix('justified')]: this.justified,
          [this._addPrefix('reversed')]: this.reversed,
        },
      ];
    },

    currentActiveKey() {
      const sidenav = !!this.$vSidenav;

      if (sidenav) {
        const snActiveKey = this.$vSidenav && this.$vSidenav.activeKey;

        return _.isUndefined(snActiveKey) ? this.activeKey : snActiveKey;
      }

      return this.activeKey;
    },
  },

  render() {
    const hasWaterline = this.appearance !== 'default';
    const children = this.$slots.default || [];
    const items = children.map(vnode => {
      const name = getName(vnode);
      const props = getProps(vnode);

      if (name === 'NavItem') {
        return cloneElement(vnode, {
          props: {
            tooltip: this.$vSidenav && !this.$vSidenav.expanded,
            active: _.isUndefined(this.currentActiveKey)
              ? props.active
              : shallowEqual(this.currentActiveKey, props.eventKey),
          },
          on: {
            select: this._handleSelect,
          },
        });
      }

      if (name === 'Dropdown') {
        return cloneElement(vnode, {
          props: {
            activeKey: this.currentActiveKey,
            componentClass: 'li',
          },
          on: {
            select: this._handleSelect,
          },
        });
      }

      return null;
    });

    return (
      <div class={this.classes} {...this.$attrs}>
        <ul>{items}</ul>
        {hasWaterline && <div class={this._addPrefix('waterline')} />}
      </div>
    );
  },

  methods: {
    _handleSelect(eventKey, event) {
      this.$emit('select', eventKey, event);
      this.$vSidenav && this.$vSidenav._handleSelect(eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
