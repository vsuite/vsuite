import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getName } from 'utils/node';
import invariant from 'utils/invariant';

const CLASS_PREFIX = 'flex-box-grid';

export default {
  name: 'FlexboxGrid',

  props: {
    align: VueTypes.oneOf(['top', 'middle', 'bottom']).def('top'),
    justify: VueTypes.oneOf([
      'start',
      'end',
      'center',
      'space-around',
      'space-between',
    ]).def('start'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.align),
        this._addPrefix(this.justify),
      ];
    },
  },

  render() {
    const children = this.$slots.default || [];
    const data = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    // prettier-ignore
    invariant.not(
      children
        .map(vnode => getName(vnode))
        .some(x => x && x !== 'FlexboxGridItem'),
      '<FlexboxGrid>\'s children must be <FlexboxGridItem>'
    );

    return <div {...data}>{children}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
