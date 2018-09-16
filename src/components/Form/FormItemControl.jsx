import VueTypes from 'vue-types';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import FormItemError from './FormItemError.jsx';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'form-control';

export default {
  name: 'FormItemControl',

  props: {
    htmlFor: VueTypes.string,
    errorShow: VueTypes.any.def(false),
    errorMessage: VueTypes.string,
    errorPlacement: VueTypes.oneOf(Popper.placements).def('bottom-start'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const errorData = splitDataByComponent(
      {
        class: this._addPrefix('message-wrapper'),
        splitProps: {
          htmlFor: this.htmlFor,
          show: !!this.errorShow,
          placement: this.errorPlacement,
        },
      },
      FormItemError
    );

    return (
      <div class={this._addPrefix('wrapper')}>
        {this.$slots.default}
        <FormItemError {...errorData}>
          {this.$slots.errorMessage || this.errorMessage}
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
