import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'picker-search-bar';

export default {
  name: 'PickerSearchBar',

  props: {
    value: VueTypes.string,
    placeholder: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const iptData = splitDataByComponent(
      {
        class: this._addPrefix('input'),
        splitProps: {
          ...this.$attrs,
          value: this.value,
          placeholder: this.placeholder,
        },
        on: { input: this._handleChange },
      },
      'input'
    );

    return (
      <div class={this.classPrefix}>
        <input {...iptData} />
        {this.$slots.default}
      </div>
    );
  },

  methods: {
    _handleChange(event) {
      this.$emit('change', event.target.value, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
