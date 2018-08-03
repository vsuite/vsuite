import VueTypes from 'vue-types';
import { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'btn-toolbar';

export default {
  name: 'ButtonToolbar',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const btnToolbarData = {
      class: this.classPrefix,
      attrs: {
        role: 'toolbar',
        ...this.$attrs,
      },
      on: this.$listeners,
    };

    return <div {...btnToolbarData}>{this.$slots.default}</div>;
  },
};
