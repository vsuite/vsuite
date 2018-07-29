import VueTypes from 'vue-types';
import { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'btn-toolbar';

export default {
  name: 'ButtonToolbar',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    return (
      <div
        class={this.classPrefix}
        role="toolbar"
        {...this.$attrs}
        {...{ on: this.$listeners }}
      >
        {this.$slots.default}
      </div>
    );
  },
};
