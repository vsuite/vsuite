import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Input from 'components/Input';
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
        on: { change: this._handleChange },
      },
      Input
    );

    return (
      <div class={this.classPrefix}>
        <Input {...iptData} />
        {this.$slots.default}
      </div>
    );
  },

  methods: {
    _handleChange(val, event) {
      this.$emit(val, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
