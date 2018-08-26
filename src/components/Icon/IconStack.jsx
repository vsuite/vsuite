import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'icon';

export default {
  name: 'IconStack',

  props: {
    size: VueTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    status: VueTypes.oneOf([
      'primary',
      'success',
      'info',
      'warning',
      'warn',
      'danger',
      'error',
    ]),
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
      return [
        prefix(this.classPrefix, 'stack'),
        {
          [this._addPrefix(this.size)]: this.size,
          [prefix('text', this.status)]: this.satus,
          [this._addPrefix('spin')]: this.spin,
          [this._addPrefix('pulse')]: this.pulse,
          [this._addPrefix('inverse')]: this.inverse,
          [this._addPrefix('fw')]: this.fixedWidth,
          [this._addPrefix(`flip-${this.flip || ''}`)]: this.flip,
          [this._addPrefix(`rotate-${this.rotate || ''}`)]: this.rotate,
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
