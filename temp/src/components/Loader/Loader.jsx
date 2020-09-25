import VueTypes from 'vue-types';
import { getWidth, addStyle } from 'dom-lib';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { SIZES } from 'utils/constant';
import renderX, { RenderX } from 'utils/render';
import { isIE11, isEdge } from 'shares/browser';

const CLASS_PREFIX = 'loader';

export default {
  name: 'Loader',

  props: {
    size: VueTypes.oneOf(SIZES),
    backdrop: VueTypes.bool.def(false),
    center: VueTypes.bool.def(false),
    inverse: VueTypes.bool.def(false),
    vertical: VueTypes.bool.def(false),
    speed: VueTypes.oneOf(['slow', 'normal', 'fast']).def('normal'),
    content: RenderX,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot-content
  },

  computed: {
    classes() {
      return [
        this._addPrefix('wrapper'),
        this._addPrefix(`speed-${this.speed}`),
        this._addPrefix(this.size),
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
    if (this.center || this.backdrop) {
      const width = getWidth(this.$refs.loader);

      addStyle(this.$refs.loader, {
        display: isIE11() || isEdge() ? 'block' : 'table',
        width: `${width}px`,
      });
    }
  },

  render(h) {
    const loaderData = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return (
      <div {...loaderData}>
        {this.backdrop && <div class={this._addPrefix('backdrop')} />}
        <div class={this.classPrefix} ref="loader">
          <span class={this._addPrefix('spin')} />
          {this.hasContent && (
            <span class={this._addPrefix('content')}>
              {renderX(h, this.content) || this.$slots.content}
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
