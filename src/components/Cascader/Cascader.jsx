import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import onMenuKeydown from 'utils/onMenuKeydown';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { findNode, mapNode } from 'utils/tree';
import { splitDataByComponent } from 'utils/split';
import { findComponentUpward } from 'utils/find';
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

      this.focusPaths.forEach(key => {
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
      let nodes = this.activePaths.map(key =>
        findNode(this.dataList, x => x.key === key)
      );

      nodes.forEach((node, index) => {
        const { key, label } = node;

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
        labels = this.renderValue(h, nodes.map(node => node.data));
      }

      return { item, exists: !!item, label: labels };
    },

    _setVal(val, event) {
      this.innerVal = val;

      this.$emit('change', val, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _handleSelect(item, layer, event) {
      this.focusPaths.splice(layer, this.focusPaths.length, item.key);

      if (!item.children) {
        this.activePaths = [...this.focusPaths];

        // close popper
        this._closePopper();

        this._setVal(item.value, event);
      }

      this.$emit('select', item, event);
    },

    _handleClean(event) {
      if (this.disabled) return;

      this.activePaths = [];
      this.focusPaths = [];

      this._setVal(null, event);
    },

    _handleKeydown(event) {
      event.stopPropagation();

      onMenuKeydown(event, {
        down: this._handleFocusDown,
        up: this._handleFocusUp,
        right: this._handleFocusRight,
        left: this._handleFocusLeft,
        enter: this._handleFocusCurrent,
        esc: this._closePopper,
      });
    },

    _handleFocusDown() {
      const len = this.focusPaths.length;
      const index = len - 1;
      const curr = index < 0 ? 0 : index;
      const key = this.focusPaths[index];
      const list = this.panelList[curr].filter(
        x => !this.disabledItemValues.some(y => shallowEqual(y, x.value))
      );
      const pos = _.findIndex(list, x => x.key === key);

      if (pos + 1 >= list.length) return;

      if (pos === -1 && list[0]) {
        this.focusPaths.splice(curr, len, list[0].key);
      } else if (pos !== -1 && list[pos + 1]) {
        this.focusPaths.splice(curr, len, list[pos + 1].key);
      } else {
        return;
      }

      this.$nextTick(
        () => this.$refs.menu && this.$refs.menu._updateScrollPosition()
      );
    },

    _handleFocusUp() {
      const len = this.focusPaths.length;
      const index = len - 1;
      const curr = index < 0 ? 0 : index;
      const key = this.focusPaths[index];
      const list = this.panelList[curr].filter(
        x => !this.disabledItemValues.some(y => shallowEqual(y, x.value))
      );
      const pos = _.findIndex(list, x => x.key === key);

      if (pos !== -1 && pos - 1 < 0) return;

      if (pos === -1 && list[0]) {
        this.focusPaths.splice(curr, len, list[0].key);
      } else if (pos !== -1 && list[pos - 1]) {
        this.focusPaths.splice(curr, len, list[pos - 1].key);
      } else {
        return;
      }

      this.$nextTick(
        () => this.$refs.menu && this.$refs.menu._updateScrollPosition()
      );
    },

    _handleFocusRight() {
      const len = this.focusPaths.length;
      const num = this.panelList.length;

      if (len >= num) return;

      const list = this.panelList[len].filter(
        x => !this.disabledItemValues.some(y => shallowEqual(y, x.value))
      );

      if (list[0]) this.focusPaths.push(list[0].key);
      else return;

      this.$nextTick(
        () => this.$refs.menu && this.$refs.menu._updateScrollPosition()
      );
    },

    _handleFocusLeft() {
      const len = this.focusPaths.length;

      if (len <= 1) return;

      this.focusPaths.pop();

      this.$nextTick(
        () => this.$refs.menu && this.$refs.menu._updateScrollPosition()
      );
    },

    _handleFocusCurrent(event) {
      const len = this.focusPaths.length;

      if (len <= 0) return;

      const index = len - 1;
      const curr = index < 0 ? 0 : index;
      const key = this.focusPaths[index];
      const list = this.panelList[curr];
      const node = _.find(list, x => x.key === key);

      if (!node) return;
      if (node.children) return;

      this._handleSelect(node, this.focusPaths.length - 1, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
