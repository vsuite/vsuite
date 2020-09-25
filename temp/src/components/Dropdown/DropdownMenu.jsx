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
import { IconX } from 'utils/svg';
import { RenderX } from 'utils/render';
import { mergeData, mergeElement } from 'utils/merge';

import { Collapse } from 'components/Animation';
import DropdownMenuItemPopper from './DropdownMenuItemPopper.jsx';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownMenu',

  props: {
    activeKey: VueTypes.any,
    eventKey: VueTypes.any,
    title: RenderX,
    icon: IconX,
    pullLeft: VueTypes.bool.def(false),

    sidenav: VueTypes.bool.def(false),
    expanded: VueTypes.bool,
    collapsible: VueTypes.bool.def(false),
    openKeys: VueTypes.arrayOf(VueTypes.any).def([]),

    // open

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
    // slot-title

    // @toggle
    // @select
  },

  render(h) {
    const children = this.$slots.default || [];
    const { items, active } = this._getItemsAndStatus(h, children);
    let data = {
      class: [this.classPrefix, { [this._addPrefix('active')]: active }],
      attrs: { ...this.$attrs, role: 'menu' },
    };

    if (this.collapsible) {
      data = _.merge(data, {
        directives: [{ name: 'show', value: this.expanded }],
      });
    }

    return this._renderCollapse(h, <ul {...data}>{items}</ul>);
  },

  methods: {
    _renderCollapse(h, children) {
      return this.collapsible ? <Collapse>{children}</Collapse> : children;
    },

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
            return mergeElement(
              cloneElement(vnode, {
                key: index,
                props: { sidenav: this.sidenav, active },
              }),
              { on: { select: this._handleSelect } }
            );
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
            const data = mergeData(
              splitDataByComponent(
                {
                  class: this._addPrefix(
                    `pull-${props.pullLeft ? 'left' : 'right'}`
                  ),
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
                  on: events,
                },
                DropdownMenuItemPopper
              ),
              { on: { toggle: this._handleToggle } }
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
      const name = getName(vnode);
      const props = getProps(vnode);
      const children = getChildren(vnode) || [];

      if (name !== 'DropdownItem' && name !== 'DropdownMenu') return false;

      // DropdownItem
      if (name === 'DropdownItem') {
        return (
          props.active ||
          (!_.isUndefined(activeKey) && shallowEqual(props.eventKey, activeKey))
        );
      }

      // DropdownMenu
      return children.some(vnode => this._isActive(vnode, activeKey));
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
