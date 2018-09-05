import VueTypes from 'vue-types';
import _ from 'lodash';
import { getHeight, getPosition, scrollTop } from 'shares/dom';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shallowEqual from 'utils/shallowEqual';
import invariant from 'utils/invariant';

import PickerDropdownMenuGroup from './PickerDropdownMenuGroup.jsx';
import PickerDropdownMenuItem from './PickerDropdownMenuItem.jsx';
import PickerDropdownMenuCheckItem from './PickerDropdownMenuCheckItem.jsx';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerDropdownMenu',

  props: {
    data: VueTypes.arrayOf(VueTypes.any).def([]),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    activeItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    focusItemValue: VueTypes.any,
    group: VueTypes.bool.def(false),
    maxHeight: VueTypes.number.def(320),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    checkable: VueTypes.bool.def(false),
    renderMenuGroup: Function,
    renderMenuItem: Function,
    dropdownMenuItemClassPrefix: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render(h) {
    const data = {
      class: this._addPrefix('items'),
      style: { maxHeight: `${this.maxHeight}px` },
      ref: 'menuBodyContainer',
    };

    return (
      <div {...data}>
        <ul>{this._renderItems(h)}</ul>
      </div>
    );
  },

  methods: {
    _renderItems(h) {
      const createMenuItems = items => {
        return items.map(
          ({ key, label, value, visible, data, children }, index) => {
            invariant.not(
              _.isUndefined(label),
              `labelKey "${this.labelKey}" is not defined in "data" : ${index}`
            );

            // PickerDropdownMenuGroup
            if (this.group && children) {
              const data = {
                key,
                directives: [{ name: 'show', value: visible }],
                props: { classPrefix: this._addPrefix('group') },
                on: { toggle: this._handleToggle },
              };

              return (
                <PickerDropdownMenuGroup {...data}>
                  <template slot="title">
                    {this.renderMenuGroup
                      ? this.renderMenuGroup(h, label, data)
                      : label}
                  </template>
                  {createMenuItems(children)}
                </PickerDropdownMenuGroup>
              );
            }

            invariant.not(
              _.isUndefined(value) && !children,
              `valueKey "${this.valueKey}" is not defined in "data" : ${index} `
            );

            const disabled =
              !_.isUndefined(this.disabledItemValues) &&
              this.disabledItemValues.some(val => shallowEqual(val, value));
            const active =
              !_.isUndefined(this.activeItemValues) &&
              this.activeItemValues.some(val => shallowEqual(val, value));
            const focus =
              !_.isUndefined(this.focusItemValue) &&
              shallowEqual(this.focusItemValue, value);
            const itemData = {
              key,
              directives: [{ name: 'show', value: visible }],
              props: {
                value,
                active,
                disabled,
                focus,
                classPrefix: this.dropdownMenuItemClassPrefix,
              },
              on: { select: (...args) => this._handleSelect(data, ...args) },
            };

            if (this.checkable) {
              return (
                <PickerDropdownMenuCheckItem {...itemData}>
                  {this.renderMenuItem
                    ? this.renderMenuItem(h, label, data)
                    : label}
                </PickerDropdownMenuCheckItem>
              );
            }

            return (
              <PickerDropdownMenuItem {...itemData}>
                {this.renderMenuItem
                  ? this.renderMenuItem(h, label, data)
                  : label}
              </PickerDropdownMenuItem>
            );
          }
        );
      };

      return createMenuItems(this.data);
    },

    _handleSelect(item, value, event, checked) {
      this.$emit('select', value, item, event, checked);
    },

    _handleToggle(event) {
      this.$emit('toggle', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    // update scroll position
    _updateScrollPosition() {
      const menuBodyContainer =
        this.$refs.menuBodyContainer || this.$refs.menuBodyContainer.$el;

      if (!menuBodyContainer) return;

      const activeItem = menuBodyContainer.querySelector(
        `.${this._addPrefix('item-focus')}`
      );

      if (!activeItem) return;

      const position = getPosition(activeItem, menuBodyContainer);
      const sTop = scrollTop(menuBodyContainer);
      const sHeight = getHeight(menuBodyContainer);

      if (position.top < sTop) {
        scrollTop(menuBodyContainer, Math.max(0, position.top - 20));
      } else if (position.top > sTop + sHeight) {
        scrollTop(menuBodyContainer, Math.max(0, position.top - sHeight + 32));
      }
    },
  },
};
