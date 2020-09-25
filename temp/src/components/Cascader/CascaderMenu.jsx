import VueTypes from 'vue-types';
import _ from 'lodash';
import { getHeight, getPosition, scrollTop } from 'shares/dom';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shallowEqual from 'utils/shallowEqual';

import { PickerDropdownMenuItem } from 'components/_picker';
import { findNode } from 'utils/tree';

const CLASS_PREFIX = '';

export default {
  name: 'CascaderMenu',

  props: {
    items: VueTypes.arrayOf(VueTypes.any).def([]),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    activePaths: VueTypes.arrayOf(VueTypes.any).def([]),
    focusPaths: VueTypes.arrayOf(VueTypes.any).def([]),
    menuWidth: VueTypes.number.def(120),
    menuHeight: VueTypes.number.def(200),
    renderMenu: Function,
    renderMenuItem: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render(h) {
    return (
      <div class={this._addPrefix('items')} ref="container">
        {this._renderCascade(h)}
      </div>
    );
  },

  methods: {
    _renderCascade(h) {
      const styles = { width: `${this.items.length * this.menuWidth}px` };
      const cascadeNodes = this.items.map((children, layer) => {
        const menu = (
          <ul>
            {children.map(child => this._renderCascadeNode(h, child, layer))}
          </ul>
        );
        const parentKey = this.focusPaths[layer - 1];
        const parent =
          parentKey &&
          findNode(this.items[layer - 1], x => x.key === parentKey);

        return (
          <div
            key={`${layer}_${children.length}`}
            style={{
              maxHeight: `${this.menuHeight}px`,
              width: `${this.menuWidth}px`,
            }}
            class={this._addPrefix('column')}
          >
            {this.renderMenu
              ? this.renderMenu(h, menu, parent && parent.data)
              : menu}
          </div>
        );
      });

      return <div style={styles}>{cascadeNodes}</div>;
    },

    _renderCascadeNode(h, child, layer) {
      const activeKey = this.activePaths[layer];
      const focusKey = this.focusPaths[layer];
      const active = !_.isUndefined(activeKey) && activeKey === child.key;
      const focus = !_.isUndefined(focusKey) && focusKey === child.key;

      return (
        <PickerDropdownMenuItem
          key={child.key}
          value={child.value}
          active={this.focusPaths.length ? false : active}
          focus={focus}
          disabled={this.disabledItemValues.some(x =>
            shallowEqual(x, child.value)
          )}
          classPrefix={this._addPrefix('item')}
          onSelect={this._handleSelect.bind(this, child, layer)}
        >
          {this.renderMenuItem
            ? this.renderMenuItem(h, child.label, child.data)
            : child.label}
          {child.children && <span class={this._addPrefix('caret')} />}
        </PickerDropdownMenuItem>
      );
    },

    _handleSelect(child, layer, event) {
      this.$emit('select', child, layer, event);
    },

    _updateScrollPosition() {
      const container =
        (this.$refs.container && this.$refs.container.$el) ||
        this.$refs.container;
      const columns = container.querySelectorAll(
        `.${this._addPrefix('column')}`
      );

      columns.forEach(column => {
        const activeItem = column.querySelector(
          `.${this._addPrefix('item-focus')}`
        );

        if (!activeItem) return;

        const position = getPosition(activeItem, column);
        const sTop = scrollTop(column);
        const sHeight = getHeight(column);

        if (position.top < sTop) {
          scrollTop(column, Math.max(0, position.top - 20));
        } else if (position.top > sTop + sHeight) {
          scrollTop(column, Math.max(0, position.top - sHeight + 32));
        }
      });
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
