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
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.icon)]: !this.isSvgIcon,
          [this._addPrefix(this.size)]: this.size,
          [prefix('text', this.status)]: this.status,
          [this._addPrefix('spin')]: this.spin,
          [this._addPrefix('pulse')]: this.pulse,
          [this._addPrefix('inverse')]: this.inverse,
          [this._addPrefix('fw')]: this.fixedWidth,
          [this._addPrefix(`flip-${this.flip || ''}`)]: this.flip,
          [this._addPrefix(`stack-${this.stack || ''}`)]: this.stack,
          [this._addPrefix(`rotate-${this.rotate || ''}`)]: this.rotate,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const iconData = {
      class: this.classes,
      props: this.attrs,
      on: this.$listeners,
    };

    return (
      <Component {...iconData}>
        {this.isSvgIcon ? (
          <svg style={this.svgStyle} viewBox={this.icon.viewBox}>
            <use xlinkHref={`#${this.icon.id}`} />
          </svg>
        ) : null}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
