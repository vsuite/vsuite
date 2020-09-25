import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import Modal from 'components/Modal';
import { Slide } from 'components/Animation';

const CLASS_PREFIX = 'drawer';

export default {
  name: 'Drawer',

  props: {
    placement: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('right'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const data = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          drawer: true,
          overflow: true,
          classPrefix: this.classPrefix,
          animation: Slide,
          animationData: {
            props: { placement: this.placement },
          },
        },
        on: this.$listeners,
      },
      Modal
    );

    if (data.props.modalClassNames) {
      data.props.modalClassNames = [
        data.props.modalClassNames,
        this._addPrefix(this.placement),
      ];
    } else {
      data.props.modalClassNames = this._addPrefix(this.placement);
    }

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
