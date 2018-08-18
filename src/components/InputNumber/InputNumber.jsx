import VueTypes from 'vue-types';
import _ from 'lodash';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { SIZES } from 'utils/constant';

const CLASS_PREFIX = 'input-number';

const isFloat = value => /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');

function getDecimalLength(value) {
  if (isFloat(value)) {
    return value.toString().split('.')[1].length;
  }

  return 0;
}

function decimals(...values) {
  const lengths = values.map(getDecimalLength);

  return Math.max(...lengths);
}

export default {
  name: 'InputNumber',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    min: VueTypes.number.def(-Infinity),
    max: VueTypes.number.def(Infinity),
    step: VueTypes.number.def(1),
    value: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    defaultValue: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    prefix: VueTypes.string, // prefix
    postfix: VueTypes.string, // postfix
    disabled: VueTypes.bool.def(false),
    size: VueTypes.oneOf(SIZES),
    buttonAppearance: VueTypes.oneOf([
      'default',
      'primary',
      'link',
      'subtle',
      'ghost',
    ]).def('subtle'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerVal: _.isUndefined(this.value) ? this.defaultValue : this.value,
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },

    disabledUpButton() {
      if (typeof this.currentVal !== 'undefined' && this.currentVal !== null) {
        return +this.currentVal >= this.max;
      }

      return false;
    },

    disabledDownButton() {
      if (typeof this.currentVal !== 'undefined' && this.currentVal !== null) {
        return +this.currentVal <= this.min;
      }

      return false;
    },
  },

  render() {
    const iptGroupData = {
      class: this.classPrefix,
      props: {
        ..._.pick(this.$attrs, ['inside']),
        disabled: this.disabled,
        size: this.size,
      },
    };
    const iptData = {
      props: {
        type: 'text',
        ..._.omit(this.$attrs, ['inside']),
        step: this.step,
        value: _.isNil(this.currentVal) ? '' : this.currentVal,
        disabled: this.disabled,
      },
      on: {
        focus: this._handleFocus,
        blur: this._handleBlur,
        change: this._handleChange,
        keydown: this._handleKeydown,
        wheel: this._handleWheel,
      },
    };

    return (
      <InputGroup {...iptGroupData}>
        {this.$slots.prefix ||
          (this.prefix && <InputGroup.Addon>{this.prefix}</InputGroup.Addon>)}

        <Input {...iptData} />

        <span class={this._addPrefix('btn-group-vertical')}>
          <Button
            class={this._addPrefix('touchspin-up')}
            appearance={this.buttonAppearance}
            disabled={this.disabledUpButton || this.disabled}
            onClick={this._handlePlus}
          >
            <Icon icon="arrow-up-line" />
          </Button>
          <Button
            class={this._addPrefix('touchspin-down')}
            appearance={this.buttonAppearance}
            disabled={this.disabledDownButton || this.disabled}
            onClick={this._handleMinus}
          >
            <Icon icon="arrow-down-line" />
          </Button>
        </span>
        {this.$slots.postfix ||
          (this.postfix && <InputGroup.Addon>{this.postfix}</InputGroup.Addon>)}
      </InputGroup>
    );
  },

  methods: {
    _setVal(val, event) {
      this.innerVal = val;

      this.$emit('change', val, event);
    },

    // focus
    _handleFocus(event) {
      this.$emit('focus', event);
    },

    // blur
    _handleBlur(event) {
      const targetValue = Number.parseFloat(event.target.value);

      this.$emit('blur', event);

      this._setVal(this._getSafeValue(targetValue), event);
    },

    // click add btn
    _handlePlus(event) {
      const value = +(this.currentVal || 0);
      const bit = decimals(value, this.step);
      const nextValue = (value + this.step).toFixed(bit);

      this._setVal(this._getSafeValue(nextValue), event);
    },

    // click minus btn
    _handleMinus(event) {
      const value = +(this.currentVal || 0);
      const bit = decimals(value, this.step);
      const nextValue = (value - this.step).toFixed(bit);

      this._setVal(this._getSafeValue(nextValue), event);
    },

    // input change
    _handleChange(value, event) {
      const val = this._getSafeValue(value);

      if (!/^-?(?:\d+)?(\.)?(\d+)*$/.test(val) && val !== '') {
        return;
      }

      this._setVal(val, event);
    },

    // up or down key
    _handleKeydown(event) {
      event.stopPropagation();

      // plus
      if (event.keyCode === 38) {
        this._handlePlus(event);
      }

      // minus
      if (event.keyCode === 40) {
        this._handleMinus(event);
      }

      this.$emit('keydown', event);
    },

    // mouse wheel
    _handleWheel(event) {
      if (!this.disabled && event.target === document.activeElement) {
        event.preventDefault();

        const delta =
          _.get(event, 'wheelDelta') || -event.deltaY || -event.detail;

        if (delta > 0) {
          this._handleMinus(event);
        }

        if (delta < 0) {
          this._handlePlus(event);
        }
      }

      this.$emit('wheel', event);
    },

    // safe value
    _getSafeValue(value) {
      if (!Number.isNaN(value)) {
        if (+value > this.max) {
          return this.max;
        }

        if (+value < this.min) {
          return this.min;
        }

        return value;
      }

      return '';
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
