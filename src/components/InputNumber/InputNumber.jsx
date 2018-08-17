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

/* eslint-disable */
function decimals(...values) {
  const lengths = values.map(getDecimalLength);

  return Math.max(...lengths);
}

function getButtonStatus(value, min, max) {
  const status = {
    disabledUpButton: false,
    disabledDownButton: false,
  };

  if (typeof value !== 'undefined' && value !== null) {
    status.disabledUpButton = +value >= max;
    status.disabledDownButton = +value <= min;
  }

  return status;
}

export default {
  name: 'InputNumber',

  props: {
    min: VueTypes.number.def(-Infinity),
    max: VueTypes.number.def(Infinity),
    step: VueTypes.number.def(1),
    value: [String, Number],
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

    // onWheel
    // onChange
  },

  computed: {
    disabledUpButton() {
      if (typeof this.value !== 'undefined' && this.value !== null) {
        return +this.value >= this.max;
      }

      return false;
    },

    disabledDownButton() {
      if (typeof this.value !== 'undefined' && this.value !== null) {
        return +this.value <= this.min;
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
        value: _.isNil(this.value) ? '' : this.value,
        disabled: this.disabled,
      },
      on: {
        ...this.$listeners,
        change: this._handleChange,
        wheel: this._handleWheel,
      },
    };

    return (
      <InputGroup {...iptGroupData}>
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
      </InputGroup>
    );
  },

  methods: {
    // click add btn
    _handlePlus() {},

    // click minus btn
    _handleMinus() {},

    // safe value
    _getSafeValue(value) {
      if (!Number.isNaN(value)) {
        if (+value > this.max) {
          return this.max;
        }

        if (+value < this.min) {
          return this.min;
        }
      }

      return '';
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
