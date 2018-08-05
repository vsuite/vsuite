import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'flex-box-grid-item';

export default {
  name: 'FlexboxGridItem',

  props: {
    colspan: VueTypes.number,
    order: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.colspan),
        {
          [this._addPrefix(`order-${this.order}`)]: this.order,
        },
      ];
    },
  },

  render() {
    const itemData = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <div {...itemData}>{this.$slots.default}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
