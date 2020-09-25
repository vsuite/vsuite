import { splitDataByComponent } from 'utils/split';

import CheckTreePicker from 'components/CheckTreePicker';

export default {
  name: 'CheckTree',

  render() {
    const data = splitDataByComponent(
      {
        splitProps: {
          defaultExpandAll: false,
          ...this.$attrs,
          inline: true,
        },
        scopedSlots: this.$scopedSlots,
        on: this.$listeners,
        ref: 'picker',
      },
      CheckTreePicker
    );

    return (
      <CheckTreePicker {...data}>
        {this.$slots.header && (
          <template slot="header">{this.$slots.header}</template>
        )}
        {this.$slots.placeholder && (
          <template slot="placeholder">{this.$slots.placeholder}</template>
        )}
        {this.$slots.footer && (
          <template slot="footer">{this.$slots.footer}</template>
        )}
      </CheckTreePicker>
    );
  },
};
