import VueTypes from 'vue-types';
// import Whisper from 'components/Whisper';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'tooltip';

export default {
  name: 'Tooltip',

  mixins: [popperMixin],

  props: {
    title: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      const placement = `placement-${_.kebabCase(this.placement || '')}`;

      return [
        this.classPrefix,
        {
          [this._addPrefix(placement)]: this.placement,
        },
      ];
    },
  },

  render() {
    const tooltipData = {
      class: this.classes,
      directives: [{ name: 'show', value: this.cVisible }],
      ref: 'popper',
    };

    return (
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        ref="container"
      >
        <div ref="reference">{this.$slots.default}</div>
        <transition name="fade">
          <div {...tooltipData}>
            <div class={this._addPrefix('arrow')} />
            <div class={this._addPrefix('inner')}>
              {this.title || this.$slots.title}
            </div>
          </div>
        </transition>
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
