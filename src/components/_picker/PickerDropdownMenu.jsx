import VueTypes from 'vue-types';
import _ from 'lodash';
import { getHeight, getPosition, scrollTop } from 'dom-lib';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shallowEqual from 'utils/shallowEqual';

import PickerDropdownMenuGroup from './PickerDropdownMenuGroup.jsx';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerDropdownMenu',

  props: {
    data: VueTypes.arrayOf(VueTypes.any).def([]),
    group: VueTypes.bool.def(false),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    activeItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    focusItemValue: VueTypes.any,
    maxHeight: VueTypes.number.def(320),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    renderMenuGroup: Function,
    renderMenuItem: Function,
    dropdownMenuItemComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]).isRequired,
    dropdownMenuItemClassPrefix: VueTypes.string,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot-scope-menu-item
    // slot-scope-menu-group
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

  mounted() {
    this._updateScrollPosition();
  },

  watch: {
    focusItemValue: {
      handler() {
        this._updateScrollPosition();
      },
      deep: true,
    },
  },

  methods: {
    _renderItems(h) {
      const createMenuItems = items => {
        return items.map((item, index) => {
          const { key, label, value, visible, data, children } = item;

          // PickerDropdownMenuGroup
          if (this.group && children) {
            const groupData = {
              key,
              directives: [{ name: 'show', value: visible }],
              props: { classPrefix: this._addPrefix('group') },
              on: { toggle: this._handleToggle },
            };

            return (
              <PickerDropdownMenuGroup {...groupData}>
                <template slot="title">
                  {this.$scopedSlots.menuGroup
                    ? this.$scopedSlots.menuGroup(label, data)
                    : this.renderMenuGroup
                    ? this.renderMenuGroup(h, label, data)
                    : label}
                </template>
                {createMenuItems(children)}
              </PickerDropdownMenuGroup>
            );
          }

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
            on: { select: this._handleSelect.bind(item) },
          };
          const PickerDropdownMenuItemComponent = this
            .dropdownMenuItemComponentClass;

          return (
            <PickerDropdownMenuItemComponent {...itemData}>
              {this.$scopedSlots.menuItem
                ? this.$scopedSlots.menuItem(label, data)
                : this.renderMenuItem
                ? this.renderMenuItem(h, label, data)
                : label}
            </PickerDropdownMenuItemComponent>
          );
        });
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
        (this.$refs.menuBodyContainer && this.$refs.menuBodyContainer.$el) ||
        this.$refs.menuBodyContainer;

      if (!menuBodyContainer) return;

      let activeItem = menuBodyContainer.querySelector(
        `.${this._addPrefix('item-focus')}`
      );

      if (!activeItem) {
        activeItem = menuBodyContainer.querySelector(
          `.${this._addPrefix('item-active')}`
        );
      }

      if (!activeItem) {
        return;
      }

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
