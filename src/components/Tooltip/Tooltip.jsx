import VueTypes from 'vue-types';
import _ from 'lodash';
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
        /* eslint-disable */
        [this._addPrefix(
          `placement-${_.kebabCase(this.placement || '')}`
        )]: this.placement,
      },
    ];
    const styles = {
      // left: this.positionLeft,
      // top: this.positionTop,
      opacity: this.visible ? 1 : undefined,
    };
    const tooltipData = {
      class: classes,
      style: styles,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return (
      <div {...tooltipData}>
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
