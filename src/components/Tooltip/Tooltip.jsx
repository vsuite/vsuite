import VueTypes from 'vue-types';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
// import { addStyle, getAttr } from 'shares/dom';

const CLASS_PREFIX = 'tooltip';

export default {
  name: 'Tooltip',

  model: {
    prop: 'visible',
    event: 'change',
  },

  mixins: [popperMixin],

  props: {
    title: VueTypes.string,
    inline: VueTypes.bool.def(false),
    theme: VueTypes.oneOf(['dark', 'light']).def('dark'),
    maxWidth: VueTypes.number.def(250),
    innerStyle: VueTypes.object.def({}),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      popperOptions: {
        modifiers: { offset: { offset: '0 10' } },
      },
    };
  },

  computed: {
    popperClasses() {
      return [
        this._addPrefix('popper'),
        {
          [this._addPrefix(`popper-${this.theme}`)]: this.theme,
          [this._addPrefix('popper-inline')]: this.inline,
        },
      ];
    },
  },

  // // FIXME: check dynamic change the title property
  // watch: {
  //   currentVisible(val) {
  //     const popper = this.$refs.popper;
  //     const placement = getAttr(popper, 'x-placement');
  //
  //     if (!val && popper) {
  //       if (~placement.indexOf('top')) {
  //         addStyle(popper, { top: '2px' });
  //       }
  //
  //       if (~placement.indexOf('bottom')) {
  //         addStyle(popper, { top: '-2px' });
  //       }
  //
  //       if (~placement.indexOf('right')) {
  //         addStyle(popper, { left: '-2px' });
  //       }
  //
  //       if (~placement.indexOf('left')) {
  //         addStyle(popper, { left: '2px' });
  //       }
  //     }
  //   },
  // },

  render(h) {
    if (this.inline) return this._renderTooltip(h);

    const tooltipData = {
      class: this.classPrefix,
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      on: {},
      ref: 'container',
    };
    const referenceData = {
      class: this._addPrefix('rel'),
      on: {},
      ref: 'reference',
    };
    const popperData = {
      class: this.popperClasses,
      style: {},
      directives: [{ name: 'transfer-dom' }],
      attrs: {
        'data-transfer': `${this.transfer}`,
      },
      ref: 'popper',
    };
    const arrowData = {
      class: this._addPrefix('arrow'),
      ref: 'arrow',
    };

    this._addTriggerListeners(referenceData, tooltipData);

    return (
      <div {...tooltipData}>
        <div {...referenceData}>{this.$slots.default}</div>
        <transition
          enterClass="in"
          leaveClass="fade"
          onAfterLeave={() => this._destroyPopper()}
        >
          {this.currentVisible && (
            <div {...popperData}>
              <div {...arrowData} />
              <div class={this._addPrefix('inner')}>
                {this.title || this.$slots.title}
              </div>
            </div>
          )}
        </transition>
      </div>
    );
  },

  methods: {
    _renderTooltip() {
      const data = {
        class: this.popperClasses,
        attrs: {
          'x-placement': this.placement,
        },
      };

      return (
        <div {...data}>
          <div class={this._addPrefix('arrow')} />
          <div
            class={this._addPrefix('inner')}
            style={{ ...this.innerStyle, maxWidth: `${this.maxWidth}px` }}
          >
            {this.title || this.$slots.title}
          </div>
        </div>
      );
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
