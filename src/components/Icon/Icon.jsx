import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'icon';

export default {
  name: 'Icon',

  props: {
    icon: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.shape({ viewBox: VueTypes.string, id: VueTypes.string }),
    ]),
    size: VueTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
    flip: VueTypes.oneOf(['horizontal', 'vertical']),
    stack: VueTypes.oneOf(['1x', '2x']),
    rotate: VueTypes.number,
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
          [this._addPrefix('spin')]: this.spin,
          [this._addPrefix('pulse')]: this.pulse,
          [this._addPrefix('fw')]: this.fixedWidth,
          [this._addPrefix('inverse')]: this.inverse,
          [this._addPrefix(`size-${this.size || ''}`)]: this.size,
          [this._addPrefix(`flip-${this.flip || ''}`)]: this.flip,
          [this._addPrefix(`stack-${this.stack || ''}`)]: this.stack,
          [this._addPrefix(`rotate-${this.rotate || ''}`)]: this.rotate,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const iconData = splitDataByComponent(
      {
        class: this.classes,
        splitProps: this.attrs,
        on: this.$listeners,
      },
      Component
    );

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
