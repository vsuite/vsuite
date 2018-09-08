import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { eachNode, findNode, flattenNodes, mapNode } from 'utils/tree';
import { splitDataByComponent } from 'utils/split';
import { vueToString } from 'utils/node';
import shallowEqual from 'utils/shallowEqual';

import { Collapse } from 'components/Animation';
import {
  PickerMenuWrapper,
  PickerToggle,
  PickerSearchBar,
  getToggleWrapperClassName,
} from 'components/_picker';

import CheckTreePickerNode from './CheckTreePickerNode.jsx';

import { CHECK_STATUS } from './constants';
import onMenuKeydown from 'shares/onMenuKeydown';
import { getHeight, getPosition, scrollTop } from 'shares/dom';

const CLASS_PREFIX = 'picker';

export default {
  name: 'CheckTreePicker',

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
    value: VueTypes.arrayOf(VueTypes.any),
    defaultValue: VueTypes.arrayOf(VueTypes.any).def([]),
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
    disabledCheckboxValues: VueTypes.arrayOf(VueTypes.any).def([]),
    maxHeight: VueTypes.number.def(320),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    childrenKey: VueTypes.string.def('children'),
    placeholder: VueTypes.string,
    searchable: VueTypes.bool,
    cleanable: VueTypes.bool,
    cascade: VueTypes.bool,
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
    const initVal = _.isUndefined(this.value)
      ? this.defaultValue
      : this.value || [];

    return {
      innerVal: initVal,
      focusItemValue: initVal[0],
      expandKeys: [],
      searchKeyword: '',
    };
  },

  computed: {
    currentVal() {
      return (_.isUndefined(this.value) ? this.innerVal : this.value) || [];
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
          let status = CHECK_STATUS.UNCHECKED;

          if (!children) {
            visible = this._shouldDisplay(label, this.searchKeyword);
            status = this.currentVal.some(x => shallowEqual(x, value))
              ? CHECK_STATUS.CHECKED
              : CHECK_STATUS.UNCHECKED;
          } else if (this.cascade) {
            visible = children.length
              ? children.some(child => child.visible)
              : true;
            status = children.length
              ? children.every(child => child.status === CHECK_STATUS.CHECKED)
                ? CHECK_STATUS.CHECKED
                : children.every(
                    child => child.status === CHECK_STATUS.UNCHECKED
                  )
                  ? CHECK_STATUS.UNCHECKED
                  : CHECK_STATUS.INDETERMINATE
              : CHECK_STATUS.UNCHECKED;
          } else {
            visible =
              this._shouldDisplay(label, this.searchKeyword) ||
              (children.length ? children.some(child => child.visible) : true);
            status = this.currentVal.some(x => shallowEqual(x, value))
              ? CHECK_STATUS.CHECKED
              : CHECK_STATUS.UNCHECKED;
          }

          return {
            key: `${layer}-${
              _.isNumber(value) || _.isString(value) ? value : index
            }`,
            label,
            value,
            data,
            visible,
            status,
          };
        },
        this.childrenKey
      );
    },

    flatDataList() {
      return flattenNodes(this.dataList, false);
    },
  },

  render(h) {
    if (this.inline) return this._renderCheckTree(h);

    const hasValue = !!(this.currentVal && this.currentVal.length);
    const selectedItems = this.currentVal.map(x =>
      findNode(this.rawDataWithCache, item =>
        shallowEqual(_.get(item, this.valueKey), x)
      )
    );
    let selectedLabel = hasValue
      ? this.$t('_.CheckTreePicker.selectedValues', [selectedItems.length])
      : this.$slots.placeholder ||
        this.placeholder ||
        this.$t('_.Picker.placeholder');

    if (this.renderValue && hasValue) {
      selectedLabel = this.renderValue(h, this.currentVal, selectedItems);
    }

    const referenceData = {
      class: getToggleWrapperClassName(
        'checktree',
        this._addPrefix,
        this,
        hasValue
      ),
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      attrs: { tabindex: -1, role: 'menu' },
      on: { keydown: this._handleKeydown },
      ref: 'reference',
    };
    const toggleData = splitDataByComponent({
      splitProps: {
        ...this.$attrs,
        hasValue,
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
        <PickerToggle {...toggleData}>{selectedLabel}</PickerToggle>
        <transition name="picker-fade">
          {this._renderDropdownMenu(h, popperData)}
        </transition>
      </div>
    );
  },

  methods: {
    _renderDropdownMenu(h, popperData) {
      popperData = _.merge(popperData, {
        class: [this._addPrefix('checktree-menu'), this.menuClassName],
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
            ? this.renderMenu(h, this._renderCheckTree(h))
            : this._renderCheckTree(h)}
          {this.$slots.footer}
        </PickerMenuWrapper>
      );
    },

    _renderCheckTree(h) {
      // tree root
      const layer = 0;
      const classPrefix = this._addPrefix('checktree-view');
      const classes = [
        classPrefix,
        {
          'without-children': !this.dataList.some(data => !!data.children),
        },
      ];
      const nodes = this.dataList.map(data =>
        this._renderCheckTreeNode(h, data, layer, classPrefix)
      );

      return (
        <div class={classes} ref="container">
          <div class={this._addPrefix('checktree-nodes')}>{nodes}</div>
        </div>
      );
    },

    _renderCheckTreeNode(h, node, layer, classPrefix) {
      const key = node.key;
      const label = node.label;
      const value = node.value;
      const visible = node.visible;
      const status = node.status;
      const children = node.children;
      const data = splitDataByComponent(
        {
          key,
          splitProps: {
            node,
            layer,
            value,
            label,
            status,
            focus: shallowEqual(value, this.focusItemValue),
            active: this.currentVal.some(x => shallowEqual(x, value)),
            disabled: this.disabledItemValues.some(x => shallowEqual(x, value)),
            disabledCheckbox: this.disabledCheckboxValues.some(x =>
              shallowEqual(x, value)
            ),
            classPrefix,
            renderTreeIcon: this.renderTreeIcon,
            renderTreeNode: this.renderTreeNode,
          },
          directives: [{ name: 'show', value: visible }],
          on: { select: this._handleSelect, toggle: this._handleToggle },
        },
        CheckTreePickerNode
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
            <CheckTreePickerNode {...data} />
            <Collapse>
              <div {...childrenData}>
                {children.map(child =>
                  this._renderCheckTreeNode(h, child, layer, classPrefix)
                )}
              </div>
            </Collapse>
          </div>
        );
      }

      return <CheckTreePickerNode {...data} />;
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

    _handleSelect(isChecked, item, event) {
      const newVal = _.cloneDeep(this.currentVal);
      const list = [];
      let result = newVal;

      if (this.cascade) {
        eachNode(
          [item],
          ({ value }) => list.push(value),
          true,
          this.childrenKey
        );

        result = isChecked
          ? _.unionWith(newVal, list, shallowEqual)
          : _.differenceWith(newVal, list, shallowEqual);
      } else if (isChecked) {
        result.push(item.value);
      } else {
        result.splice(_.findIndex(result, v => shallowEqual(v, item.value)), 1);
      }

      this._setVal(result, event);
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

      this._setVal([], event);
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
      const container =
        (this.$refs.container && this.$refs.container.$el) ||
        this.$refs.container;

      if (!container) return;

      const activeItem = container.querySelector(
        `.${this._addPrefix('checktree-view-node-focus')}`
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

      let isChecked = false;

      if (item.status !== CHECK_STATUS.CHECKED) {
        isChecked = true;
      }

      this._handleSelect(isChecked, item, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
