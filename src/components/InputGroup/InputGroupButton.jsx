import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import Button from 'components/Button';

const CLASS_PREFIX = 'input-group-btn';

export default {
  name: 'InputGroupButton',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const data = splitDataByComponent(
      {
        class: this.classPrefix,
        splitProps: {
          ...this.$attrs,
          componentClass: 'a',
        },
        on: this.$listeners,
      },
      Button
    );

    return <Button {...data}>{this.$slots.default}</Button>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
