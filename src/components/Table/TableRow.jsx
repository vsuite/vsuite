import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'table-row';

export default {
  name: 'TableRow',

  props: {
    top: VueTypes.number,
    width: VueTypes.number,
    height: VueTypes.number.def(46),
    isHeaderRow: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('header')]: this.isHeaderRow,
        },
      ];
    },
  },

  render() {
    const styles = {
      minWidth: `${this.width}px`,
      height: `${this.height}px`,
    };
    const children = this.$slots.default;

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
