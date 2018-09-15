import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import FormItemError from './FormItemError.jsx';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'form-control';

export default {
  name: 'FormItemControl',

  props: {
    error: VueTypes.any.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const errorData = splitDataByComponent(
      {
        class: this._addPrefix('message-wrapper'),
        splitProps: {
          ...this.$attrs,
          show: !!this.error,
        },
      },
      FormItemError
    );

    return (
      <div class={this._addPrefix('wrapper')}>
        {this.$slots.default}
        <FormItemError {...errorData}>
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
