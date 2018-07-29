import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'icon';

export default {
  name: 'IconStack',

  props: {
    size: VueTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    status: VueTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    flip: VueTypes.oneOf(['horizontal', 'vertical']),
    rotate: VueTypes.oneOf([0, 90, 180, 270]),
    spin: VueTypes.bool.def(false),
    pulse: VueTypes.bool.def(false),
    inverse: VueTypes.bool.def(false),
    fixedWidth: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'span'
    ),
  },

  computed: {
    classes() {
      const addPrefix = prefix(this.classPrefix);

      return [
        prefix(this.classPrefix, 'stack'),
        {
          [addPrefix(this.size)]: this.size,
          [prefix('text', this.status)]: this.satus,
          [addPrefix('spin')]: this.spin,
          [addPrefix('pulse')]: this.pulse,
          [addPrefix('inverse')]: this.inverse,
          [addPrefix('fw')]: this.fixedWidth,
          [addPrefix(`flip-${this.flip || ''}`)]: this.flip,
          [addPrefix(`rotate-${this.rotate || ''}`)]: this.rotate,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const iconStackData = {
      class: this.classes,
      props: this.$attrs,
      on: this.$listeners,
    };

    return <Component {...iconStackData}>{this.$slots.default}</Component>;
  },
};
