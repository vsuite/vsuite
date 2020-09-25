import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'icon-stack';

export default {
  name: 'IconStack',

  props: {
    size: VueTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'span'
    ),

    // slot
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(`size-${this.size || ''}`)]: this.size,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const iconStackData = splitDataByComponent(
      {
        class: this.classes,
        splitProps: this.$attrs,
        on: this.$listeners,
      },
      Component
    );

    return <Component {...iconStackData}>{this.$slots.default}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
