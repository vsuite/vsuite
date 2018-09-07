import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { findNode, mapNode } from 'utils/tree';
import { splitDataByComponent } from 'utils/split';
import shallowEqual from 'utils/shallowEqual';

import {
  PickerMenuWrapper,
  PickerToggle,
  getToggleWrapperClassName,
} from 'components/_picker';

import CascaderMenu from './CascaderMenu.jsx';

const CLASS_PREFIX = 'picker';

export default {
  name: 'Cascader',

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
    appearance: VueTypes.oneOf(['default', 'subtle']).def('default'),
    data: VueTypes.arrayOf(VueTypes.any).def([]),
    cacheData: VueTypes.arrayOf(VueTypes.any).def([]),
    block: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    childrenKey: VueTypes.string.def('children'),
    placeholder: VueTypes.string,
    cleanable: VueTypes.bool,
    menuClassName: VueTypes.string,
    menuStyle: VueTypes.object,
    menuWidth: VueTypes.number.def(120),
    menuHeight: VueTypes.number.def(200),
    renderMenu: Function,
    renderMenuItem: Function,
    renderValue: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    toggleComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]),
  },

  data() {
    const initVal = _.isUndefined(this.value) ? this.defaultValue : this.value;

    return {
      innerVal: initVal,
      activePaths: [],
      focusPaths: [],
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
        (data, index, layer) => {
          const value = _.get(data, this.valueKey);
          const label = _.get(data, this.labelKey);

          return {
            key: `${layer}-${
              _.isNumber(value) || _.isString(value) ? value : index
            }`,
            label,
            value,
            data,
          };
        },
        this.childrenKey
      );
    },

    panelList() {
      let curr = this.dataList;
      const list = [curr];

      this.focusPaths.forEach(({ key }) => {
        const node = findNode(curr, x => x.key === key);

        if (node && node.children) {
          curr = node.children;
          list.push(node.children);
        }
      });

      return list;
    },
  },

  render(h) {
    const { exists, label } = this._getLabelByValue(h, this.currentVal);
    const referenceData = {
      class: getToggleWrapperClassName(
        'cascader',
        this._addPrefix,
        this,
        exists
      ),
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
        class: [this._addPrefix('cascader-menu'), this.menuClassName],
        style: this.menuStyle,
        on: { keydown: this._handleKeydown },
      });

      const menuData = splitDataByComponent({
        splitProps: {
          items: this.panelList,
          disabledItemValues: this.disabledItemValues,
          activePaths: this.activePaths,
          focusPaths: this.focusPaths,
          menuWidth: this.menuWidth,
          menuHeight: this.menuHeight,
          renderMenu: this.renderMenu,
          renderMenuItem: this.renderMenuItem,
          classPrefix: this._addPrefix('cascader-menu'),
        },
        on: { select: this._handleSelect },
        ref: 'menu',
      });

      return (
        <PickerMenuWrapper {...popperData}>
          {this.$slots.header}
          <CascaderMenu {...menuData} />
          {this.$slots.footer}
        </PickerMenuWrapper>
      );
    },

    _getLabelByValue(h, value) {
      const item = findNode(this.rawDataWithCache, item =>
        shallowEqual(_.get(item, this.valueKey), value)
      );
      let labels = [];

      this.activePaths.forEach(({ key, label }, index) => {
        labels.push(<span key={key}>{label}</span>);

        if (index < this.activePaths.length - 1) {
          labels.push(
            <span class="separator" key={`${key}-separator`}>
              {' / '}
            </span>
          );
        }
      });

      if (this.renderValue) {
        labels = this.renderValue(h, this.activePaths);
      }

      return { item, exists: !!item, label: labels };
    },

    _setVal(val, event) {},

    _handleSelect() {},

    _handleClean(event) {},

    _handleKeydown(event) {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
