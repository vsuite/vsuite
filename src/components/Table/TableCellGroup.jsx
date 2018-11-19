import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import translateDOMPositionXY from 'utils/translateDOMPositionXY';

const CLASS_PREFIX = 'table-cell-group';

export default {
  name: 'TableCellGroup',

  props: {
    fixed: VueTypes.oneOfType([VueTypes.string, VueTypes.bool]).def(false),
    left: VueTypes.number.def(0),
    width: VueTypes.number,
    height: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.fixed ? 'fixed' : 'scroll'),
        {
          [this._addPrefix(`fixed-${this.fixed}`)]: !!this.fixed,
        },
      ];
    },
  },

  render() {
    const styles = {
      width: `${this.width}px`,
      height: `${this.height}px`,
    };
    const children = this.$slots.default;

    translateDOMPositionXY(styles, this.left, 0);

    return (
      <div class={this.classes} style={styles}>
        {children}
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
