import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import onMenuKeydown from 'shares/onMenuKeydown';
import { getHeight, getPosition, scrollTop } from 'shares/dom';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { findNode, flattenNodes, mapNode } from 'utils/tree';
import invariant from 'utils/invariant';
import { vueToString } from 'utils/node';
import { splitDataByComponent } from 'utils/split';
import shallowEqual from 'utils/shallowEqual';

import {
  PickerMenuWrapper,
  PickerToggle,
  PickerSearchBar,
  getToggleWrapperClassName,
} from 'components/_picker';
import { Collapse } from 'components/Animation';

import TreePickerNode from './TreePickerNode.jsx';

const CLASS_PREFIX = 'picker';

export default {
  name: 'TreePicker',

  model: {
    prop: 'value',
    event: 'change',
  },

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
    value: VueTypes.any,
    defaultValue: VueTypes.any,
    expandAll: {
      type: Boolean,
      default: undefined,
    },
    defaultExpandAll: VueTypes.bool,
    inline: VueTypes.bool.def(false),
    appearance: VueTypes.oneOf(['default', 'subtle']).def('default'),
    data: VueTypes.arrayOf(VueTypes.any).def([]),
    cacheData: VueTypes.arrayOf(VueTypes.any).def([]),
    block: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    maxHeight: VueTypes.number.def(320),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    childrenKey: VueTypes.string.def('children'),
    placeholder: VueTypes.string,
    searchable: VueTypes.bool,
    cleanable: VueTypes.bool,
    leaf: VueTypes.bool.def(false),
    menuClassName: VueTypes.string,
    menuStyle: VueTypes.object,
    renderMenu: Function,
    renderValue: Function,
    renderTreeNode: Function,
    renderTreeIcon: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    toggleComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]),
  },

  data() {
    const initVal = _.isUndefined(this.value) ? this.defaultValue : this.value;

    invariant.not(
      this.groupBy === this.valueKey || this.groupBy === this.labelKey,
      '`groupBy` can not be equal to `valueKey` and `labelKey`'
    );

    return {
      innerVal: initVal,
      focusItemValue: initVal,
      expandKeys: [],
      searchKeyword: '',
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },

    rawDataWithCache() {
      return [].concat(this.data || [], this.cacheData || []);
    },

    dataList() {
      return mapNode(
        this.data,
        (data, index, layer, children) => {
          const value = _.get(data, this.valueKey);
          const label = _.get(data, this.labelKey);
          let visible = true;

          if (!children) {
            visible = this._shouldDisplay(label, this.searchKeyword);
          } else if (this.leaf) {
            visible = children.some(child => child.visible);
          } else {
            visible =
              this._shouldDisplay(label, this.searchKeyword) ||
              children.some(child => child.visible);
          }

          return {
            key: `${layer}-${
              _.isNumber(value) || _.isString(value) ? value : index
            }`,
            label,
            value,
            data,
            visible,
          };
        },
        this.childrenKey
      );
    },

    flatDataList() {
      return flattenNodes(this.dataList, this.leaf);
    },
  },

  render(h) {
    if (this.inline) return this._renderTree(h);

    const { exists, label } = this._getLabelByValue(h, this.currentVal);

    const referenceData = {
      class: getToggleWrapperClassName('tree', this._addPrefix, this, exists),
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      attrs: { tabindex: -1, role: 'menu' },
      on: { keydown: this._handleKeydown },
      ref: 'reference',
    };
    const toggleData = splitDataByComponent({
      splitProps: {
        ...this.$attrs,
        hasValue: exists,
        cleanable: this.cleanable && !this.disabled,
        componentClass: this.toggleComponentClass,
      },
      on: { clean: this._handleClean },
    });
    const popperData = {
      directives: [
        { name: 'show', value: this.currentVisible },
        { name: 'transfer-dom' },
      ],
      attrs: { 'data-transfer': `${this.transfer}` },
      ref: 'popper',
    };

    if (!this.disabled) this._addTriggerListeners(toggleData, referenceData);

    return (
      <div {...referenceData}>
        <PickerToggle {...toggleData}>
          {exists
            ? label
            : this.$slots.placeholder ||
              this.placeholder ||
              this.$t('_.Picker.placeholder')}
        </PickerToggle>
        <transition name="picker-fade">
          {this._renderDropdownMenu(h, popperData)}
        </transition>
      </div>
    );
  },

  methods: {
    _renderDropdownMenu(h, popperData) {
      popperData = _.merge(popperData, {
        class: [this._addPrefix('tree-menu'), this.menuClassName],
        style: this.menuStyle,
        on: { keydown: this._handleKeydown },
      });

      return (
        <PickerMenuWrapper {...popperData}>
          {this.$slots.header}
          {this.searchable && (
            <PickerSearchBar
              placeholder={this.$t('_.Picker.searchPlaceholder')}
              value={this.searchKeyword}
              onChange={this._handleSearch}
              ref="search"
            />
          )}
          {this.renderMenu
            ? this.renderMenu(h, this._renderTree(h))
            : this._renderTree(h)}
          {this.$slots.footer}
        </PickerMenuWrapper>
      );
    },

    _renderTree(h) {
      // tree root
      const layer = 0;
      const classPrefix = this._addPrefix('tree-view');
      const nodes = this.dataList.map(data =>
        this._renderTreeNode(h, data, layer, classPrefix)
      );

      return (
        <div class={classPrefix} ref="container">
          <div class={this._addPrefix('tree-view-nodes')}>{nodes}</div>
        </div>
      );
    },

    _renderTreeNode(h, node, layer, classPrefix) {
      const key = node.key;
      const label = node.label;
      const value = node.value;
      const visible = node.visible;
      const children = node.children;
      const data = splitDataByComponent(
        {
          key,
          splitProps: {
            node,
            layer,
            value,
            label,
            branch: this.leaf && !!children,
            focus: shallowEqual(value, this.focusItemValue),
            active: shallowEqual(value, this.currentVal),
            disabled: this.disabledItemValues.some(x => shallowEqual(x, value)),
            classPrefix,
            renderTreeIcon: this.renderTreeIcon,
            renderTreeNode: this.renderTreeNode,
          },
          directives: [{ name: 'show', value: visible }],
          on: { select: this._handleSelect, toggle: this._handleToggle },
        },
        TreePickerNode
      );

      if (children) {
        layer += 1;

        const expand = this._getNodeExpand(node);
        const divData = {
          key,
          class: [
            prefix(classPrefix, 'node-children'),
            { [prefix(classPrefix, 'open')]: expand },
          ],
        };
        const childrenData = {
          class: prefix(classPrefix, 'children'),
          directives: [{ name: 'show', value: visible && expand }],
        };

        return (
          <div {...divData}>
            <TreePickerNode {...data} />
            <Collapse>
              <div {...childrenData}>
                {children.map(child =>
                  this._renderTreeNode(h, child, layer, classPrefix)
                )}
              </div>
            </Collapse>
          </div>
        );
      }

      return <TreePickerNode {...data} />;
    },

    _getLabelByValue(h, value) {
      const item = findNode(this.rawDataWithCache, item =>
        shallowEqual(_.get(item, this.valueKey), value)
      );
      let label = _.get(item, this.labelKey);

      if (this.renderValue) {
        label = this.renderValue(h, label, item);
      }

      return { item, exists: !!item, label };
    },

    _getNodeExpand(node) {
      if (node.children && node.children.length === 0) return false;
      if (!_.isUndefined(this.expandAll)) return this.expandAll;

      return this.expandKeys.some(k => shallowEqual(k, node.key))
        ? !this.defaultExpandAll
        : this.defaultExpandAll;
    },

    _shouldDisplay(label, searchKeyword) {
      const word =
        (_.isUndefined(searchKeyword) ? this.searchKeyword : searchKeyword) ||
        '';

      if (!_.trim(word)) return true;

      const keyword = word.toLocaleLowerCase();

      if (_.isString(label) || _.isNumber(label)) {
        return `${label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
      } else if (_.isObject(label)) {
        return (
          vueToString(label)
            .join('')
            .toLocaleLowerCase()
            .indexOf(keyword) >= 0
        );
      }
    },

    _setVal(val, event) {
      this.innerVal = val;

      this.$emit('change', val, event);
    },

    _handleSelect(item, event) {
      const value = item.value;

      this.focusItemValue = value;

      // close popper
      this._closePopper();

      this._setVal(value, event);
    },

    _handleToggle(item, event) {
      if (!(item.children && item.children.length === 0)) {
        const index = this.expandKeys.indexOf(item.key);

        if (index === -1) {
          this.expandKeys.push(item.key);
        } else {
          this.expandKeys.splice(index, 1);
        }
      }

      this.$emit('toggle', item.data, event);
    },

    _handleSearch(value, event) {
      this.searchKeyword = value;

      this.$emit('search', value, event);
    },

    _handleClean(event) {
      if (this.disabled) return;

      this.focusItemValue = null;
      this.searchKeyword = '';
      this.expandKeys = [];

      this._setVal(null, event);
    },

    _handleKeydown(event) {
      event.stopPropagation();

      onMenuKeydown(event, {
        down: this._handleFocusNext,
        up: this._handleFocusPrev,
        enter: this._handleFocusCurrent,
        esc: this._closePopper,
      });
    },

    _updateScrollPosition() {
      const container = this.$refs.container || this.$refs.container.$el;

      if (!container) return;

      const activeItem = container.querySelector(
        `.${this._addPrefix('tree-view-node-focus')}`
      );

      if (!activeItem) return;

      const position = getPosition(activeItem, container);
      const sTop = scrollTop(container);
      const sHeight = getHeight(container);

      if (position.top < sTop) {
        scrollTop(container, Math.max(0, position.top - 20));
      } else if (position.top > sTop + sHeight) {
        scrollTop(container, Math.max(0, position.top - sHeight + 32));
      }
    },

    _handleFocusNext() {
      const val = this.focusItemValue;
      const list = this.flatDataList.filter(
        x =>
          x.visible &&
          !this.disabledItemValues.some(y => shallowEqual(y, x.value))
      );
      const length = list.length;
      const index = _.findIndex(list, x => shallowEqual(x.value, val));

      if (!length) return;
      if (index === -1) this.focusItemValue = list[0] && list[0].value;
      if (index + 1 < length) this.focusItemValue = list[index + 1].value;

      this.$nextTick(() => this._updateScrollPosition());
    },

    _handleFocusPrev() {
      const val = this.focusItemValue;
      const list = this.flatDataList.filter(
        x =>
          x.visible &&
          !this.disabledItemValues.some(y => shallowEqual(y, x.value))
      );
      const length = list.length;
      const index = _.findIndex(list, x => shallowEqual(x.value, val));

      if (!length) return;
      if (index === -1) this.focusItemValue = list[0] && list[0].value;
      if (index - 1 >= 0) this.focusItemValue = list[index - 1].value;

      this.$nextTick(() => this._updateScrollPosition());
    },

    _handleFocusCurrent(event) {
      const item = _.find(this.flatDataList, x =>
        shallowEqual(x.value, this.focusItemValue)
      );

      if (!item) return;

      this._handleSelect(item, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
