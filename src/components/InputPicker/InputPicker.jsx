import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getWidth } from 'shares/dom';
import onMenuKeydown from 'shares/onMenuKeydown';
import { vueToString } from 'utils/node';
import { mapNode, findNode, flattenNodes } from 'utils/tree';
import { splitDataByComponent } from 'utils/split';
import getDataGroupBy from 'utils/getDataGroupBy';
import shallowEqual from 'utils/shallowEqual';
import invariant from 'utils/invariant';

import {
  PickerMenuWrapper,
  PickerDropdownMenu,
  PickerToggle,
  getToggleWrapperClassName,
} from 'components/_picker';
import Tag from 'components/Tag';

import InputPickerSearch from './InputPickerSearch.jsx';

const CLASS_PREFIX = 'picker';

export default {
  name: 'InputPicker',

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
      default: 'focus',
    },
    value: VueTypes.any,
    defaultValue: VueTypes.any,
    data: VueTypes.arrayOf(VueTypes.any).def([]),
    cacheData: VueTypes.arrayOf(VueTypes.any).def([]),
    block: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    maxHeight: VueTypes.number.def(320),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    groupBy: VueTypes.any,
    placeholder: VueTypes.string,
    searchable: VueTypes.bool,
    cleanable: VueTypes.bool,
    creatable: VueTypes.bool.def(false),
    multiple: VueTypes.bool.def(false),
    menuClassName: VueTypes.string,
    menuStyle: VueTypes.object,
    renderMenu: Function,
    renderMenuItem: Function,
    renderMenuGroup: Function,
    renderValue: Function,
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
      innerVal: this.multiple ? initVal || [] : initVal,
      focusItemValue: this.multiple ? (initVal || [])[0] : initVal,
      searchKeyword: '',
      newData: [],
      maxWidth: 100,
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },

    rawData() {
      return [].concat(this.data || [], this.newData || []);
    },

    rawDataWithCache() {
      return [].concat(this.rawData, this.cacheData || []);
    },

    dataList() {
      let list = [...this.rawData];

      if (
        this.creatable &&
        this.searchKeyword &&
        !findNode(list, item =>
          this._shouldDisplay(_.get(item, this.labelKey), this.searchKeyword)
        )
      ) {
        list.push(this._createOption(this.searchKeyword));
      }

      if (this.groupBy) {
        list = getDataGroupBy(list, this.groupBy);
      }

      return mapNode(list, (data, index, layer, children) => {
        const value = _.get(data, this.valueKey);
        const label = _.get(data, this.labelKey);

        return {
          key: `${layer}-${
            _.isNumber(value) || _.isString(value) ? value : index
          }`,
          label,
          value,
          data,
          visible: children
            ? children.some(child => child.visible)
            : this._shouldDisplay(label, this.searchKeyword),
        };
      });
    },

    flatDataList() {
      return flattenNodes(this.dataList);
    },
  },

  mounted() {
    const reference = this.$refs.reference;

    if (reference) {
      this.maxWidth = getWidth(reference);
    }
  },

  render(h) {
    const { exists, label } = this._renderSingleValue(h);
    const tags = this._renderMultiValue(h);
    const hasValue = this.multiple ? !!_.get(tags, 'length') : exists;
    const searching = !!this.searchKeyword && this.currentVisible;
    const displaySearchInput = this.searchable && !this.disabled;
    const referenceData = {
      class: getToggleWrapperClassName(
        'input',
        this._addPrefix,
        this,
        hasValue,
        {
          [this._addPrefix('tag')]: this.multiple,
          [this._addPrefix('focused')]: this.currentVisible,
        }
      ),
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      attrs: { tabindex: -1, role: 'menu' },
      on: { click: this._handleClick, keydown: this._handleKeydown },
      ref: 'reference',
    };
    const wrapperData = {
      class: this._addPrefix('tag-wrapper'),
    };
    const toggleData = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          hasValue,
          cleanable: this.cleanable && !this.disabled,
          componentClass: this.toggleComponentClass,
        },
        on: { clean: this._handleClean },
      },
      PickerToggle
    );
    const popperData = {
      directives: [
        { name: 'show', value: this.currentVisible },
        { name: 'transfer-dom' },
      ],
      attrs: { 'data-transfer': `${this.transfer}` },
      ref: 'popper',
    };

    if (!this.disabled) this._addTriggerListeners(wrapperData, wrapperData);

    return (
      <div {...referenceData}>
        <PickerToggle {...toggleData}>
          {searching || (this.multiple && hasValue)
            ? null
            : hasValue
              ? label
              : this.placeholder || this.$t('_.Picker.placeholder')}
        </PickerToggle>
        <div {...wrapperData}>
          {tags}
          {displaySearchInput && this._renderInputSearch(h)}
        </div>
        <transition name="picker-fade">
          {this._renderDropdownMenu(h, popperData)}
        </transition>
      </div>
    );
  },

  methods: {
    _renderDropdownMenu(h, popperData) {
      const menuClassPrefix = this._addPrefix(
        this.multiple ? 'check-menu' : 'select-menu'
      );

      popperData = _.merge(popperData, {
        class: [this.menuClassName, menuClassPrefix],
        style: this.menuStyle,
        on: { keydown: this._handleKeydown },
      });

      const menuData = splitDataByComponent(
        {
          splitProps: {
            data: this.dataList,
            group: !_.isUndefined(this.groupBy),
            checkable: this.multiple,
            maxHeight: this.maxHeight,
            valueKey: this.valueKey,
            labelKey: this.labelKey,
            disabledItemValues: this.disabledItemValues,
            activeItemValues: this.multiple
              ? this.currentVal
              : [this.currentVal],
            focusItemValue: this.focusItemValue,
            renderMenuGroup: this.renderMenuGroup,
            renderMenuItem: this._renderMenuItem,
            dropdownMenuItemClassPrefix: `${menuClassPrefix}-item`,
            classPrefix: menuClassPrefix,
          },
          on: { select: this._handleSelect },
          ref: 'menu',
        },
        PickerDropdownMenu
      );
      const menu = this.flatDataList.filter(x => x.visible).length ? (
        <PickerDropdownMenu {...menuData} />
      ) : (
        <div class={this._addPrefix('none')}>
          {this.$t('_.InputPicker.noResultsText')}
        </div>
      );

      return (
        <PickerMenuWrapper {...popperData}>
          {this.$slots.header}
          {this.renderMenu ? this.renderMenu(h, menu) : menu}
          {this.$slots.footer}
        </PickerMenuWrapper>
      );
    },

    _renderMenuItem(h, label, data) {
      const newLabel = data.create ? (
        <span>{this.$t('_.InputPicker.createOption', [label])}</span>
      ) : (
        label
      );

      return this.renderMenuItem
        ? this.renderMenuItem(h, newLabel, data)
        : newLabel;
    },

    _renderInputSearch() {
      const data = splitDataByComponent(
        {
          splitProps: {
            value: this.currentVisible ? this.searchKeyword : '',
            inputStyle: { maxWidth: `${this.maxWidth - 63}px` },
          },
          on: { change: this._handleSearch },
          ref: 'search',
        },
        InputPickerSearch
      );

      return <InputPickerSearch {...data} />;
    },

    _renderMultiValue(h) {
      if (!this.multiple) return null;

      const tags = this.currentVal || [];

      return tags
        .map((tag, index) => {
          const { item, label, exists } = this._getLabelByValue(h, tag);

          if (!exists) return null;

          return (
            <Tag
              key={index}
              closable={!this.disabled}
              onClose={event =>
                this._handleRemoveItem({ value: tag, data: item }, event)
              }
            >
              {label}
            </Tag>
          );
        })
        .filter(item => !!item);
    },

    _renderSingleValue(h) {
      return this._getLabelByValue(h, this.currentVal);
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

    _createOption(value) {
      let data = { create: true };

      _.set(data, this.valueKey, value);
      _.set(data, this.labelKey, value);

      if (this.groupBy) {
        _.set(data, this.groupBy, this.$t('_.InputPicker.newItem'));
      }

      return data;
    },

    _setVal(val, data, event) {
      this.innerVal = val;

      this.$emit('change', val, event);
      this.$emit('select', val, data, event);
    },

    _handleSelect(item, event, checked) {
      const { value, data } = item;
      let newVal = _.cloneDeep(this.currentVal);

      if (this.multiple && checked) {
        // add new item
        newVal.push(value);
      } else if (this.multiple && !checked) {
        // remove old item
        newVal.splice(_.findIndex(newVal, v => shallowEqual(v, value)), 1);
      } else {
        newVal = value;
      }

      // if new create item
      if (data && data.create) {
        delete data.create;

        this.newData.push(data);
      }

      this.focusItemValue = value;

      if (this.multiple) {
        this.searchKeyword = '';
      } else {
        // close popper
        this._closePopper();
      }

      this._setVal(newVal, data, event);
    },

    _handleRemoveItem(item, event) {
      if (this.disabled) return;

      this._handleSelect(item, event, false);
    },

    _handleSearch(val, event) {
      this.searchKeyword = val;

      this.$emit('search', val, event);
    },

    _handleClean(event) {
      if (this.disabled) return;

      this.focusItemValue = null;
      this.searchKeyword = '';

      this._setVal(this.multiple ? [] : null, null, event);
    },

    _handleClick() {
      this.$refs.search && this.$refs.search.focus();
    },

    _handleKeydown(event) {
      event.stopPropagation();

      onMenuKeydown(event, {
        down: this._handleFocusNext,
        up: this._handleFocusPrev,
        enter: this._handleFocusCurrent,
        del: this.multiple && !this.searchKeyword ? this._handleFocusDel : null,
        esc: this._closePopper,
      });
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

      this.$nextTick(
        () => this.$refs.menu && this.$refs.menu._updateScrollPosition()
      );
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

      this.$nextTick(
        () => this.$refs.menu && this.$refs.menu._updateScrollPosition()
      );
    },

    _handleFocusCurrent(event) {
      const item = _.find(this.flatDataList, x =>
        shallowEqual(x.value, this.focusItemValue)
      );

      if (!item) return;

      this._handleSelect(
        item,
        event,
        this.multiple
          ? !this.currentVal.some(x => shallowEqual(x, item.value))
          : false
      );
    },

    _handleFocusDel(event) {
      const len = this.currentVal.length;
      const value = this.currentVal[len - 1];
      const data = findNode(this.rawDataWithCache, item =>
        shallowEqual(_.get(item, this.valueKey), value)
      );

      if (value) this._handleSelect({ value, data }, event, false);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
