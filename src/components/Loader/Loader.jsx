import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { SIZES } from 'utils/constant';
import { getWidth } from 'utils/dom';

const CLASS_PREFIX = 'loader';

export default {
  name: 'Loader',

  props: {
    size: VueTypes.oneOf(SIZES).def('md'),
    backdrop: VueTypes.bool,
    center: VueTypes.bool,
    inverse: VueTypes.bool.def(false),
    vertical: VueTypes.bool.def(false),
    speed: VueTypes.oneOf(['fast', 'normal', 'slow']).def('normal'),
    content: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this._addPrefix('wrapper'),
        this._addPrefix(`speed-${this.speed}`),
        {
          [this._addPrefix('backdrop-wrapper')]: this.backdrop,
          [this._addPrefix('center')]: this.center,
          [this._addPrefix('inverse')]: this.inverse,
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('has-content')]: this.hasContent,
        },
      ];
    },

    hasContent() {
      return this.content || this.$slots.content;
    },
  },

  mounted() {
    if (this.content || this.backdrop) {
      const width = getWidth(this.$refs.loader);
    }
  },

  render() {
    return (
      <div class={this.classes} {...this.$attrs} {...{ on: this.$listeners }}>
        {this.backdrop && <div class={this._addPrefix('backdrop')} />}
        <div class={this._addPrefix(this.classPrefix)} ref="loader">
          <span class={this._addPrefix('spin')} />
          {this.hasContent && (
            <span class={this._addPrefix('content')}>
              {this.content || this.$slots.content}
            </span>
          )}
        </div>
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
