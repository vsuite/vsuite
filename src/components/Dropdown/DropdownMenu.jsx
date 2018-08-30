import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import {
  getName,
  getProps,
  getAllProps,
  getEvents,
  getChildren,
  cloneElement,
} from 'utils/node';
import shallowEqual from 'utils/shallowEqual';

import { Collapse } from 'components/Animation';

import DropdownMenuItemPopper from './DropdownMenuItemPopper.jsx';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownMenu',

  props: {
    activeKey: VueTypes.any,
    title: VueTypes.string,
    icon: VueTypes.string,
    pullLeft: VueTypes.bool.def(false),
    sidenav: VueTypes.bool.def(false),
    expanded: VueTypes.bool,
    collapsible: VueTypes.bool.def(false),
    openKeys: VueTypes.arrayOf(VueTypes.any),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render(h) {
    const children = this.$slots.default || [];
    const { items, active } = this._getItemsAndStatus(h, children);
    let data = {
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

    if (this.sidenav) {
      data = _.merge(data, {
        directives: [{ name: 'show', value: this.expanded }],
      });
    }

    return this._renderCollapse(h, <ul {...data}>{items}</ul>);
  },

  methods: {
    _renderCollapse(h, children) {
      return <Collapse appear>{children}</Collapse>;
    },

    _getItemsAndStatus(h, children) {
      let hasActiveItem = false;

      return {
        items: children.map((vnode, index) => {
          const name = getName(vnode);
          let active = false;

          if (name === 'DropdownMenu' || name === 'DropdownMenuItem') {
            active = this._isActive(vnode, this.activeKey);

            if (active) hasActiveItem = true;
          }

          if (name === 'DropdownMenuItem') {
            return cloneElement(vnode, {
              key: index,
              props: {
                sidenav: this.sidenav,
                active,
              },
              on: {
                select: this._handleSelect,
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
            const expanded = this.openKeys.some(key =>
              shallowEqual(key, props.eventKey)
            );
            const data = splitDataByComponent(
              {
                splitProps: {
                  ...props,
                  title: props.title,
                  placement: props.pullLeft ? 'left-start' : 'right-start',
                  componentClass: 'div',
                  submenu: true,
                  sidenav: this.sidenav,
                  collapsible: this.collapsible,
                  expanded,
                  active,
                },
                on: {
                  ...events,
                  toggle: this._handleToggle,
                },
              },
              DropdownMenuItemPopper
            );

            return (
              <DropdownMenuItemPopper {...data}>
                {itemAndStatus.items}
              </DropdownMenuItemPopper>
            );
          }

          return vnode;
        }),
        active: hasActiveItem,
      };
    },

    _isActive(vnode, activeKey) {
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

            return name === 'DropdownMenuItem' || name === 'DropdownMenu';
          })
          .some(vnode => this._isActive(vnode, activeKey))
      )
        return true;

      return props.active;
    },

    _handleToggle(eventKey, event) {
      this.$emit('toggle', eventKey, event);
    },

    _handleSelect(eventKey, event) {
      this.$emit('select', eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
