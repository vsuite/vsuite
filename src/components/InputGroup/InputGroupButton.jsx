import VueTypes from 'vue-types';
import Button from 'components/Button';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'input-group-btn';

export default {
  name: 'InputGroupButton',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const data = {
      class: this.classPrefix,
      props: {
        ...this.$attrs,
        componentClass: 'a',
      },
      on: this.$listeners,
    };

    return <Button {...data}>{this.$slots.default}</Button>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
