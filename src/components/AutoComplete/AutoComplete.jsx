import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import onMenuKeydown from 'shares/onMenuKeydown';
import prefix, { defaultClassPrefix, globalKey } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import { findComponentUpward } from 'utils/find';

import { PickerMenuWrapper } from 'components/_picker';

import AutoCompleteItem from './AutoCompleteItem.jsx';

const CLASS_PREFIX = 'auto-complete';

export default {
  name: 'AutoComplete',

  model: {
    prop: 'value',
    event: 'change',
  },

  mixins: [popperMixin],

  props: {
    data: VueTypes.arrayOf(
      VueTypes.oneOfType([
        VueTypes.string,
        VueTypes.shape({ label: VueTypes.any, value: VueTypes.any }),
      ])
    ).def([]),
    value: VueTypes.string.def(() => undefined),
    defaultValue: VueTypes.string,
    /* eslint-disable vue/require-prop-types */
    placement: {
      ...popperMixin.props.placement,
      default: 'bottom-start',
    },
    trigger: {
      ...popperMixin.props.trigger,
      default: 'focus',
    },
    disabled: VueTypes.bool.def(false),
    selectOnEnter: VueTypes.bool,
    menuClassName: VueTypes.string,
    renderItem: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // select
    // menuFocus
  },

  data() {
    const initVal = _.isUndefined(this.value) ? this.defaultValue : this.value;

    return {
      innerVal: initVal,
      focusItemValue: initVal,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },

    popperClasses() {
      return [this._addPrefix('menu'), this.menuClassName];
    },

    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },

    list() {
      return this.data
        .map(item => {
          if (_.isString(item)) {
            return { label: item, value: item };
          }

          if (typeof item === 'object') {
            return item;
          }
        })
        .filter(x => !!x);
    },

    focusableList() {
      if (!this.list) return [];

      return this.list.filter(item => {
        const value = this.currentVal || '';

        if (!_.trim(value)) {
          return false;
        }

        const keyword = value.toLocaleLowerCase();

        return item.label.toLocaleLowerCase().indexOf(keyword) >= 0;
      });
    },
  },

  render(h) {
    const acData = {
      class: this.classes,
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      on: {},
      ref: 'container',
    };
    const referenceData = {
      class: this._addPrefix('rel'),
      on: {},
      ref: 'reference',
    };
    const popperData = {
      class: this.popperClasses,
      style: {},
      directives: [
        {
          name: 'show',
          value: this.currentVisible && this.focusableList.length,
        },
        { name: 'transfer-dom' },
      ],
      attrs: {
        'data-transfer': `${this.transfer}`,
      },
      ref: 'popper',
    };
    const iptData = splitDataByComponent(
      {
        class: `${globalKey}input`,
        splitProps: {
          ...this.$attrs,
          disabled: this.disabled,
          value: this.currentVal,
        },
        on: {
          input: this._handleInputChange,
          blur: this._handleBlur,
          keydown: this._handleInputKeydown,
        },
      },
      'input'
    );

    if (!this.disabled) {
      this._addTriggerListeners(referenceData, acData);
    }

    return (
      <div {...acData}>
        <div {...referenceData}>
          <input {...iptData} />
        </div>
        <transition name="picker-fade">
          {this._renderDropdownMenu(h, popperData)}
        </transition>
      </div>
    );
  },

  methods: {
    _renderDropdownMenu(h, popperData) {
      return (
        <PickerMenuWrapper {...popperData}>
          <ul role="menu">
            {this.focusableList.map(item => (
              <AutoCompleteItem
                key={item.value}
                focus={this.focusItemValue === item.value}
                itemData={item}
                renderItem={this.renderItem}
                onSelect={this._handleItemClick}
              >
                {this.$scopedSlots.item && this.$scopedSlots.item(item)}
              </AutoCompleteItem>
            ))}
          </ul>
        </PickerMenuWrapper>
      );
    },

    _setVal(val, event) {
      this.innerVal = val;
      this.focusItemValue = val;

      this.$emit('change', val, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _resetVal(event) {
      this.$nextTick(() => {
        if (event.target.value === this.currentVal) return;

        event.target.value = this.currentVal;
      });
    },

    _handleItemClick(item, event) {
      const value = item.value;

      this._closePopper();
      this._setVal(value, event);

      this.$emit('select', item, event);
    },

    _handleInputChange(event) {
      const value = event.target.value;

      this._openPopper();
      this._setVal(value, event);
      this._resetVal(event);
    },

    _handleBlur(event) {
      this.$emit('blur', event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('blur');
      }
    },

    _handleInputKeydown(event) {
      onMenuKeydown(event, {
        down: this._handleFocusNext,
        up: this._handleFocusPrev,
        enter: this.selectOnEnter ? this._handleFocusCurrent : undefined,
        esc: this._closePopper,
      });

      this.$emit('keydown', event);
    },

    _handleFocusNext() {
      const value = this.focusItemValue || '';
      const list = this.focusableList;

      if (!this.currentVisible) return;
      if (!list.length) return;

      const index = _.findIndex(list, o => o.value === value);
      const curr = index === -1 ? 0 : (index + 1) % list.length;

      this.focusItemValue = list[curr].value;
    },

    _handleFocusPrev() {
      const value = this.focusItemValue || '';
      const list = this.focusableList;

      if (!this.currentVisible) return;
      if (!list.length) return;

      const index = _.findIndex(list, o => o.value === value);
      const curr = index === -1 ? 0 : (index + list.length - 1) % list.length;

      this.focusItemValue = list[curr].value;
    },

    _handleFocusCurrent(event) {
      const value = this.focusItemValue || '';
      const list = this.focusableList;

      if (!this.currentVisible) return;
      if (!list.length) return;

      const index = _.findIndex(list, o => o.value === value);

      if (index === -1) return;

      this._closePopper();
      this._setVal(value, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
