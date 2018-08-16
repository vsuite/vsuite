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
        value: this.value,
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
        input: this._handleInput,
        keydown: this._handleKeydown,
      },
    };

    return <Component {...data} />;
  },

  methods: {
    _handleInput(event) {
      this.$emit('input', event);
      this.$emit('change', event.target.value);
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
