import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { SIZES } from 'utils/constant';

const CLASS_PREFIX = 'input';

export default {
  name: 'Input',

  props: {
    id: VueTypes.string,
    type: VueTypes.string.def('text'),
    value: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    size: VueTypes.oneOf(SIZES),
    disabled: VueTypes.bool.def(false),
    placeholder: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'input'
    ),
  },

  data() {
    return {
      currentVal: this.value,
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
  },

  render() {
    const Component = this.componentClass;
    const data = {
      class: this.classes,
      domProps: {
        value: this.currentVal,
      },
      attrs: {
        id: this.id,
        type: this.type,
        disabled: this.disabled,
        placeholder: this.placeholder,
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
        focus: this.handleFocus,
        blur: this.handleBlur,
        input: this._handleInput,
        change: this._handleChange,
        keydown: this._handleKeydown,
      },
    };

    return <Component {...data} />;
  },

  methods: {
    _setVal(val, event) {
      this.currentVal = val;

      this.$emit('input', event);
      this.$emit('change', val, event);

      this.$nextTick(() => (this.currentVal = this.value));
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    handleBlur(event) {
      this.$emit('blur', event);
    },

    _handleInput(event) {
      this._setVal(event.target.value, event);
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
