import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'input-group-addon';

export default {
  name: 'InputGroupAddon',

  props: {
    disabled: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
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
  },

  render() {
    const data = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <span {...data}>{this.$slots.default}</span>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
