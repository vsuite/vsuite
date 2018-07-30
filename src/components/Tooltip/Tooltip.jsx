import VueTypes from 'vue-types';
import kebabcase from 'lodash.kebabcase';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'tooltip';

export default {
  name: 'Tooltip',

  props: {
    placement: VueTypes.oneOf([]),
    positionLeft: VueTypes.number,
    positionTop: VueTypes.number,
    visible: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const classes = [
      this.classPrefix,
      {
        [this._addPrefix(`placement-${kebabcase(this.placement || '')}`)]: this
          .placement,
      },
    ];
    const styles = {
      left: this.positionLeft,
      top: this.positionTop,
      opacity: this.visible ? 1 : undefined,
    };

    return (
      <div
        role="tooltip"
        class={classes}
        style={styles}
        {...this.$attrs}
        {...{ on: this.$listeners }}
      >
        <div class={this._addPrefix('arrow')} />
        <div class={this._addPrefix('inner')}>{this.$slots.default}</div>
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
