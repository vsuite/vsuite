import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'form-group';

export default {
  name: 'FormItemLabel',

  props: {
    htmlFor: VueTypes.string,
    srOnly: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          'sr-only': this.srOnly,
        },
      ];
    },
  },

  render() {
    return (
      <label class={this.classes} for={this.htmlFor}>
        {this.$slots.default}
      </label>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
