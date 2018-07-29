import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { SIZES } from 'utils/constant';

const CLASS_PREFIX = 'btn-group';

export default {
  name: 'ButtonGroup',

  props: {
    size: VueTypes.oneOfType(SIZES),
    vertical: VueTypes.bool.def(false),
    justified: VueTypes.bool.def(false),
    block: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      const addPrefix = prefix(this.classPrefix);

      return [
        this.classPrefix,
        {
          [addPrefix('vertical')]: this.vertical,
          [addPrefix('justified')]: this.justified,
          [addPrefix('block')]: this.block,
        },
      ];
    },
  },

  render() {
    console.dir(this.$slots.default);

    return null;
  },
};
