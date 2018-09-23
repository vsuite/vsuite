import VueTypes from 'vue-types';
import { splitDataByComponent } from 'utils/split';

import InputPicker from 'components/InputPicker';
import { findComponentUpward } from 'utils/find';

export default {
  name: 'TagPicker',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: VueTypes.any,
  },

  render() {
    const data = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          multiple: true,
          value: this.value,
        },
        scopedSlots: this.$scopedSlots,
        on: {
          ...this.$listeners,
          change: this._handleChange,
          blur: this._handleBlur,
        },
        ref: 'picker',
      },
      InputPicker
    );

    return (
      <InputPicker {...data}>
        {this.$slots.header && (
          <template slot="header">{this.$slots.header}</template>
        )}
        {this.$slots.placeholder && (
          <template slot="placeholder">{this.$slots.placeholder}</template>
        )}
        {this.$slots.footer && (
          <template slot="footer">{this.$slots.footer}</template>
        )}
      </InputPicker>
    );
  },

  methods: {
    _handleChange(val, event) {
      this.$emit('change', val, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _handleBlur(event) {
      this.$emit('blur', event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('blur');
      }
    },

    show() {
      this.$refs.picker.show();
    },

    close() {
      this.$refs.picker.close();
    },
  },
};
