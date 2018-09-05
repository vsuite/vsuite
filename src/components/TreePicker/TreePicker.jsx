import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import onMenuKeydown from 'shares/onMenuKeydown';
import { getHeight, getPosition, scrollTop } from 'shares/dom';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { filterNodes, findNode } from 'utils/tree';
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

    dataWithCacheList() {
      return [].concat(this.data || [], this.cacheData || []);
    },

    focusableDataList() {
      return filterNodes(
        this.data,
        item => this._shouldDisplay(item[this.labelKey]),
        this.childrenKey
      );
    },
  },

  render(h) {
    if (this.inline) return this._renderTree(h);

    const { isValid, displayElement } = this._getLabelByValue(
      h,
      this.currentVal
    );

    const referenceData = {
      class: getToggleWrapperClassName(
        'select',
        this._addPrefix,
        this,
        isValid
      ),
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      attrs: { tabindex: -1, role: 'menu' },
      on: { keydown: this._handleKeydown },
      ref: 'reference',
    };
    const toggleData = splitDataByComponent({
      splitProps: {
        ...this.$attrs,
        hasValue: isValid,
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
          {displayElement || this.$t('_.Picker.placeholder')}
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
      const nodes = this.focusableDataList.map((data, index) =>
        this._renderTreeNode(h, data, index, layer, classPrefix, `${layer}-`)
      );

      return (
        <div class={classPrefix} ref="container">
          <div class={this._addPrefix('tree-view-nodes')}>{nodes}</div>
        </div>
      );
    },

    _renderTreeNode(h, node, index, layer, classPrefix, ref) {
      const key = this._getNodeKey(node, index, ref);
      const children = node[this.childrenKey] || [];
      const value = node[this.valueKey];
      const label = node[this.labelKey];
      const data = splitDataByComponent(
        {
          key,
          splitProps: {
            node,
            layer,
            value,
            label,
            focus: shallowEqual(value, this.focusItemValue),
            active: shallowEqual(value, this.currentVal),
            disabled: this.disabledItemValues.some(x => shallowEqual(x, value)),
            uniqueKey: key,
            classPrefix,
            renderTreeIcon: this.renderTreeIcon,
            renderTreeNode: this.renderTreeNode,
          },
          on: { select: this._handleSelect, toggle: this._handleToggle },
        },
        TreePickerNode
      );

      if (children.length) {
        layer += 1;

        const expand = this._getNodeExpand(key);
        const childrenData = {
          class: prefix(classPrefix, 'children'),
          directives: [{ name: 'show', value: expand }],
        };

        return (
          <div
            class={[
              prefix(classPrefix, 'node-children'),
              { [prefix(classPrefix, 'open')]: expand },
            ]}
            key={key}
          >
            <TreePickerNode {...data} />
            <Collapse>
              <div {...childrenData}>
                {children.map((child, i) =>
                  this._renderTreeNode(
                    h,
                    child,
                    i,
                    layer,
                    classPrefix,
                    `${key}-`
                  )
                )}
              </div>
            </Collapse>
          </div>
        );
      }

      return <TreePickerNode {...data} />;
    },

    _getLabelByValue(h, value) {
      const activeItem = findNode(
        this.dataWithCacheList,
        item => shallowEqual(item[this.valueKey], value),
        this.childrenKey
      );
      let displayElement = this.$slots.placeholder || this.placeholder;

      if (_.get(activeItem, this.labelKey)) {
        displayElement = _.get(activeItem, this.labelKey);

        if (this.renderValue) {
          displayElement = this.renderValue(h, activeItem, value);
        }
      }

      return { activeItem, isValid: !!activeItem, displayElement };
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

    _getNodeKey(node, index, prefix) {
      if (!node) return prefix || '';

      const value = node[this.valueKey];

      if (_.isString(value) || _.isNumber(value)) {
        return `${prefix || ''}${value}`;
      }

      return `${prefix || ''}${index}`;
    },

    _getNodeExpand(key) {
      if (!_.isUndefined(this.expandAll)) return this.expandAll;

      return this.expandKeys.some(k => shallowEqual(k, key))
        ? !this.defaultExpandAll
        : this.defaultExpandAll;
    },

    _setVal(val, node, event) {
      this.innerVal = val;

      this.$emit('change', val, event);
      this.$emit('select', val, node, event);
    },

    _handleSelect(node, event) {
      const value = node[this.valueKey];

      this.focusItemValue = value;

      // close popper
      this._closePopper();

      this._setVal(value, node, event);
    },

    _handleClean(event) {
      if (this.disabled) return;

      this.focusItemValue = null;
      this.searchKeyword = '';
      this.expandKeys = [];

      this._setVal(null, null, null, event);
    },

    _handleToggle(uniqueKey, node, event) {
      const index = this.expandKeys.indexOf(uniqueKey);

      if (index === -1) {
        this.expandKeys.push(uniqueKey);
      } else {
        this.expandKeys.splice(index, 1);
      }

      this.$emit('toggle', node, event);
    },

    _handleSearch(value, event) {
      this.searchKeyword = value;
      this.expandKeys = [];

      this.$emit('search', value, event);
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

    _flattenFocusableItems(items, list) {
      list = list || [];

      if (!items) return;
      if (!_.isArray(items)) {
        list.push(items);
      }

      const children = _.isArray(items) ? items : items[this.childrenKey] || [];

      children.forEach(child => this._flattenFocusableItems(child, list));

      return list;
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
      const focusVal = this.focusItemValue;
      const list = this._flattenFocusableItems(this.focusableDataList);
      const len = list.length;
      const index = _.findIndex(list, x =>
        shallowEqual(x[this.valueKey], focusVal)
      );

      if (index + 1 >= len) return;

      this.focusItemValue = list[index === -1 ? 0 : index + 1][this.valueKey];

      this.$nextTick(() => this._updateScrollPosition());
    },

    _handleFocusPrev() {
      const focusVal = this.focusItemValue;
      const list = this._flattenFocusableItems(this.focusableDataList);
      const index = _.findIndex(list, x =>
        shallowEqual(x[this.valueKey], focusVal)
      );

      if (index - 1 < 0) return;

      this.focusItemValue = list[index === -1 ? 0 : index - 1][this.valueKey];

      this.$nextTick(() => this._updateScrollPosition());
    },

    _handleFocusCurrent(event) {
      const focusVal = this.focusItemValue;
      const list = this._flattenFocusableItems(this.focusableDataList);
      const item = _.find(list, x => shallowEqual(x[this.valueKey], focusVal));

      if (!item) return;

      this._handleSelect(item, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
