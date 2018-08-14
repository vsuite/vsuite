import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Modal from '../Modal/Modal.jsx';

const CLASS_PREFIX = 'drawer';

export default {
  name: 'Drawer',

  props: {
    placement: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('right'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const data = {
      props: {
        ...this.$attrs,
        drawer: true,
        modalClassNames: this._addPrefix(this.placement),
        classPrefix: this.classPrefix,
      },
      on: this.$listeners,
    };

    return (
      <Modal {...data}>
        <template slot="title">{this.$slots.title}</template>
        <template slot="header">{this.$slots.header}</template>
        <template slot="default">{this.$slots.default}</template>
        <template slot="footer">{this.$slots.footer}</template>
      </Modal>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
