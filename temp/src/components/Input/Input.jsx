import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import { SIZES } from 'utils/constant';
import { findComponentUpward } from 'utils/find';

const CLASS_PREFIX = 'input';

export default {
  name: 'Input',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    id: String,
    type: VueTypes.string.def('text'),
    value: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    defaultValue: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    size: VueTypes.oneOf(SIZES),
    disabled: VueTypes.bool.def(false),
    placeholder: VueTypes.string,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'input'
    ),

    // @change
    // @focus
    // @blur
    // @pressEnter
    // @keydown
  },

  data() {
    return {
      innerVal: _.isUndefined(this.value) ? this.defaultValue : this.value,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.size)]: this.size,
        },
      ];
    },

    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },
  },

  render() {
    const Component = this.componentClass;
    const data = splitDataByComponent(
      {
        class: this.classes,
        domProps: { value: this.currentVal },
        splitProps: {
          id: this.id,
          type: this.type,
          disabled: this.disabled,
          placeholder: this.placeholder,
          ...this.$attrs,
        },
        on: {
          ...this.$listeners,
          focus: this._handleFocus,
          blur: this._handleBlur,
          input: this._handleInput,
          change: this._handleChange,
          keydown: this._handleKeydown,
        },
        ref: 'input',
      },
      Component
    );

    return <Component {...data} />;
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },

    blur() {
      this.$refs.input.blur();
    },

    _setVal(val, event) {
      this.innerVal = val;

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

    _handleFocus(event) {
      this.$emit('focus', event);
    },

    _handleBlur(event) {
      this.$emit('blur', event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('blur');
      }
    },

    _handleInput(event) {
      const value = event.target.value;

      this._setVal(value, event);
      this._resetVal(event);
    },

    _handleChange(event) {
      this.$emit('inputChange', event);
    },

    _handleKeydown(event) {
      if (event.keyCode === 13) {
        this.$emit('pressEnter', event);
      }

      this.$emit('keydown', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
