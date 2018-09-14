import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import FormItemError from './FormItemError.jsx';

const CLASS_PREFIX = 'form-control';

export default {
  name: 'FormItemControl',

  props: {
    hasError: VueTypes.bool.def(false),
    error: VueTypes.any,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    return (
      <div class={this._addPrefix('wrapper')}>
        {this.$slots.default}
        <FormItemError show={false} class={this._addPrefix('message-wrapper')}>
          {this.$slots.error || this.error}
        </FormItemError>
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
