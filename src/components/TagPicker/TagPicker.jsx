import _ from 'lodash';
import { splitDataByComponent } from 'utils/split';

import InputPicker from 'components/InputPicker';

export default {
  name: 'TagPicker',

  props: {},

  render() {
    const data = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          multiple: _.isUndefined(this.$attrs.multiple)
            ? true
            : this.$attrs.multiple,
        },
        scopedSlots: this.$scopedSlots,
        on: this.$listeners,
        ref: 'picker',
      },
      InputPicker
    );

    return (
      <InputPicker {...data}>
        {this.$slots.header && (
          <template slot="header">{this.$slots.header}</template>
        )}
        {this.$slots.footer && (
          <template slot="footer">{this.$slots.footer}</template>
        )}
      </InputPicker>
    );
  },

  methods: {
    show() {
      this.$refs.picker.show();
    },

    close() {
      this.$refs.picker.close();
    },
  },
};
