import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'icon';

export default {
  name: 'Icon',

  props: {
    icon: VueTypes.oneOfType([VueTypes.string, VueTypes.object]),
    size: VueTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    status: VueTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    flip: VueTypes.oneOf(['horizontal', 'vertical']),
    stack: VueTypes.oneOf(['1x', '2x']),
    rotate: VueTypes.oneOf([0, 90, 180, 270]),
    spin: VueTypes.bool.def(false),
    pulse: VueTypes.bool.def(false),
    inverse: VueTypes.bool.def(false),
    fixedWidth: VueTypes.bool.def(false),
    svgStyle: VueTypes.object,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'i'
    ),
  },

  computed: {
    isSvgIcon() {
      return typeof this.icon === 'object' && this.icon.id && this.icon.viewBox;
    },

    classes() {
      const addPrefix = prefix(this.classPrefix);

      return [
        this.classPrefix,
        {
          [addPrefix(this.icon)]: !this.isSvgIcon,
          [addPrefix(this.size)]: this.size,
          [prefix('text', this.status)]: this.status,
          [addPrefix('spin')]: this.spin,
          [addPrefix('pulse')]: this.pulse,
          [addPrefix('inverse')]: this.inverse,
          [addPrefix('fw')]: this.fixedWidth,
          [addPrefix(`flip-${this.flip || ''}`)]: this.flip,
          [addPrefix(`stack-${this.stack || ''}`)]: this.stack,
          [addPrefix(`rotate-${this.rotate || ''}`)]: this.rotate,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;

    return (
      <Component
        class={this.classes}
        {...this.$attrs}
        {...{ on: this.$listeners }}
      >
        {this.isSvgIcon ? (
          <svg style={this.svgStyle} viewBox={this.icon.viewBox}>
            <use xlinkHref={`#${this.icon.id}`} />
          </svg>
        ) : null}
      </Component>
    );
  },
};
