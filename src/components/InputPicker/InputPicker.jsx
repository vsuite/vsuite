import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import { filterNodes, findNode } from 'utils/tree';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import { vueToString } from 'utils/node';
import getDataGroupBy from 'utils/getDataGroupBy';
import shallowEqual from 'utils/shallowEqual';
import invariant from 'utils/invariant';

import {
  PickerMenuWrapper,
  PickerDropdownMenu,
  PickerDropdownMenuItem,
  PickerDropdownMenuCheckItem,
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
      default: 'active',
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
    placeholder: VueTypes.string, // slot
    searchable: VueTypes.bool,
    cleanable: VueTypes.bool,
    creatable: VueTypes.bool.def(false),
    multiple: VueTypes.bool.def(false),
    menuClassName: VueTypes.string,
    menuStyle: VueTypes.object,
    toggleComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]),
    renderMenu: Function,
    renderMenuItem: Function,
    renderMenuGroup: Function,
    renderValue: Function,
    renderExtraFooter: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // change, select, search, toggle
  },

  data() {
    const initVal = _.isUndefined(this.value) ? this.defaultValue : this.value;

    invariant.not(
      this.groupBy === this.valueKey || this.groupBy === this.labelKey,
      '`groupBy` can not be equal to `valueKey` and `labelKey`'
    );

    return {
      innerVal: this.multiple ? initVal || [] : initVal,
      searchKeyword: '',
      focusItemValue: this.multiple ? (initVal || [])[0] : initVal,
      newData: [],
      maxWidth: 100,
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },

    dataList() {
      return [].concat(this.data, this.newData);
    },

    dataWithCacheList() {
      return [].concat(this.dataList, this.cacheData);
    },
  },

  render(h) {
    const { isValid, displayElement } = this._renderSingleValue(h);
    const tags = this._renderMultiValue(h);
    const hasValue = this.multiple ? !!_.get(tags, 'length') : isValid;
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
      attrs: { tanindex: -1, role: 'menu' },
      on: { keydown: this._handleKeydown, click: this._handleClick },
      ref: 'reference',
    };
    const toggleData = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          componentClass: this.toggleComponentClass,
          cleanable: this.cleanable && !this.disabled,
          // hasValue
        },
        on: {
          clean: this._handleClean,
        },
      },
      PickerToggle
    );
    const popperData = {
      directives: [
        {
          name: 'show',
          value: this.currentVisible,
        },
        { name: 'transfer-dom' },
      ],
      attrs: {
        'data-transfer': `${this.transfer}`,
      },
      ref: 'popper',
    };

    this._addTriggerListeners(referenceData, referenceData);

    return (
      <div {...referenceData}>
        <PickerToggle {...toggleData}>
          {searching || (this.multiple && hasValue)
            ? null
            : displayElement || this.$t('_.InputPicker.placeholder')}
        </PickerToggle>
        <div class={this._addPrefix('tag-wrapper')}>
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
        class: [
          this.menuClassName,
          menuClassPrefix,
          // FIXME
          // this._addPrefix(`placement-${_.kebabCase(this.placement)}`),
        ],
        style: this.menuStyle,
        on: { keydown: this._handleKeydown },
      });

      let filteredData = filterNodes(this.dataList, item =>
        this._shouldDisplay(item[this.labelKey])
      );

      if (
        this.creatable &&
        this.searchKeyword &&
        !findNode(
          this.dataList,
          item => item[this.labelKey] === this.searchKeyword
        )
      ) {
        filteredData.push(this._createOption(this.searchKeyword));
      }

      if (this.groupBy) {
        filteredData = getDataGroupBy(filteredData);
      }

      const menuData = splitDataByComponent(
        {
          splitProps: {
            data: filteredData,
            group: !_.isUndefined(this.groupBy),
            maxHeight: this.maxHeight,
            valueKey: this.valueKey,
            labelKey: this.labelKey,
            disabledItemValues: this.disabledItemValues,
            activeItemValues: this.multiple ? this.value : [this.value],
            focusItemValue: this.focusItemValue,
            renderMenuGroup: this.renderMenuGroup,
            renderMenuItem: this._renderMenuItem,
            dropdownMenuItemClassPrefix: `${menuClassPrefix}-item`,
            dropdownMenuItemComponentClass: this.multiple
              ? PickerDropdownMenuCheckItem
              : PickerDropdownMenuItem,
            classPrefix: menuClassPrefix,
          },
        },
        PickerDropdownMenu
      );
      const menu = filteredData.length ? (
        <PickerDropdownMenu {...menuData} />
      ) : (
        <div class={this._addPrefix('none')}>
          {this.$t('_.InputPicker.noResultsText')}
        </div>
      );

      return (
        <PickerMenuWrapper {...popperData}>
          {this.renderMenu ? this.renderMenu(h, menu) : menu}
          {this.$slots.footer ||
            (this.renderExtraFooter && this.renderExtraFooter)}
        </PickerMenuWrapper>
      );
    },

    _renderMenuItem(h, label, item) {
      const newLabel = item.create ? (
        <span>{this.$t('_.InputPicker.createOption', [label])}</span>
      ) : (
        label
      );

      return this.renderMenuItem
        ? this.renderMenuItem(h, newLabel, item)
        : newLabel;
    },

    _renderInputSearch(h) {
      let props = { componentClass: 'input' };

      if (this.multiple) {
        props = _.merge(props, {
          // componentClass: InputAutosize // react-input-autosize
          // inputStyle: { maxWidth: this.maxWidth - 63 },
        });
      }

      const data = splitDataByComponent(
        {
          splitProps: {
            ...props,
            value: this.currentVisible ? this.searchKeyword : '',
          },
          on: {
            change: this._handleSearch,
          },
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
          const { isValid, displayElement } = this._getLabelByValue(h, tag);

          if (!isValid) return null;

          return (
            <Tag
              key={index}
              closable={!this.disabled}
              title={_.isString(displayElement) ? displayElement : undefined}
              onClose={event => this._handleRemoveItem(tag, event)}
            >
              {displayElement}
            </Tag>
          );
        })
        .filter(item => !!item);
    },

    _renderSingleValue(h) {
      return this._getLabelByValue(h, this.currentVal);
    },

    _getLabelByValue(h, value) {
      const activeItem = findNode(this.dataWithCacheList, item =>
        shallowEqual(item[this.valueKey], value)
      );
      let displayElement = this.placeholder;

      if (_.get(activeItem, this.labelKey)) {
        displayElement = _.get(activeItem, this.labelKey);

        if (this.renderValue) {
          displayElement = this.renderValue(h, value, activeItem);
        }
      }

      return { isValid: !!activeItem, displayElement };
    },

    _shouldDisplay(label, searchKeyword) {
      const word = _.isUndefined(searchKeyword)
        ? this.searchKeyword
        : searchKeyword;

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
      if (this.groupBy) {
        return {
          create: true,
          [this.groupBy]: this.$t('_.InputPicker.newItem'),
          [this.valueKey]: value,
          [this.labelKey]: value,
        };
      }

      return {
        create: true,
        [this.valueKey]: value,
        [this.labelKey]: value,
      };
    },

    _setVal(val, event) {
      const formattedVal = this.multiple ? val || [] : val;

      this.innerVal = formattedVal;

      this.$emit('change', _.clone(formattedVal), event);
    },

    _handleClick() {},

    _handleKeydown() {},

    _handleSearch() {},

    _handleClean() {},

    _handleRemoveItem() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
