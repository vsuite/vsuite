import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import {
  getName,
  getProps,
  getAllProps,
  getEvents,
  getChildren,
  cloneElement,
} from 'utils/node';
import shallowEqual from 'utils/shadowEqual';

import DropdownItemPopper from './DropdownItemPopper.jsx';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownMenu',

  props: {
    activeKey: VueTypes.any,
    title: VueTypes.string,
    icon: VueTypes.string,
    pullLeft: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {},

  render(h) {
    const children = this.$slots.default || [];
    const { items, active } = this._getItemsAndStatus(h, children);
    const data = {
      class: [
        this.classPrefix,
        {
          [this._addPrefix('active')]: active,
        },
      ],
      attrs: {
        ...this.$attrs,
        role: 'menu',
      },
    };

    return <ul {...data}>{items}</ul>;
  },

  methods: {
    _getItemsAndStatus(h, children) {
      let hasActiveItem = false;

      return {
        items: children.map((vnode, index) => {
          const name = getName(vnode);
          let active = false;

          if (name === 'DropdownMenu' || name === 'DropdownItem') {
            active = this._isActive(vnode, this.activeKey);

            if (active) hasActiveItem = true;
          }

          if (name === 'DropdownItem') {
            return cloneElement(vnode, {
              props: {
                active,
              },
              on: {
                select: this._handleItemSelect,
              },
            });
          }

          if (name === 'DropdownMenu') {
            const itemAndStatus = this._getItemsAndStatus(
              h,
              getChildren(vnode)
            );
            const props = getAllProps(vnode);
            const events = getEvents(vnode);
            const data = {
              props: { title: props.title },
              on: events,
            };

            return (
              <DropdownItemPopper
                {...props}
                {...data}
                active={active}
                placement={this.pullLeft ? 'left-start' : 'right-start'}
                submenu
                componentClass="div"
              >
                {itemAndStatus.items}
              </DropdownItemPopper>
            );
          }

          return vnode;
        }),
        active: hasActiveItem,
      };
    },

    _isActive(vnode, activeKey) {
      if (!activeKey) return false;

      const props = getProps(vnode);
      const children = getChildren(vnode);

      if (
        props.active ||
        (!_.isUndefined(activeKey) && shallowEqual(props.eventKey, activeKey))
      ) {
        return true;
      }

      if (!children) return false;
      if (
        children
          .filter(vnode => {
            const name = getName(vnode);

            return name === 'DropdownItem' || name === 'DropdownMenu';
          })
          .some(vnode => this._isActive(vnode, activeKey))
      )
        return true;

      return props.active;
    },

    _handleItemSelect(eventKey, event) {
      this.$emit('select', eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
