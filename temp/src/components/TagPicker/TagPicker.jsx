import { splitDataByComponent } from 'utils/split';

import InputPicker from 'components/InputPicker';

export default {
  name: 'TagPicker',

  model: {
    prop: 'value',
    event: 'change',
  },

  render() {
    const data = splitDataByComponent(
      {
        splitProps: { ...this.$attrs, multi: true },
        on: { ...this.$listeners },
        slots: this.$slots,
        scopedSlots: this.$scopedSlots,
        ref: 'picker',
      },
      InputPicker
    );

    return <InputPicker {...data} />;
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
