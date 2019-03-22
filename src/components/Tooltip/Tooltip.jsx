import VueTypes from 'vue-types';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';

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
    white: VueTypes.bool.def(false),
    maxWidth: VueTypes.number.def(250),
    innerStyle: VueTypes.object.def({}),
    positionLeft: VueTypes.number,
    positionTop: VueTypes.number.def(2),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
    // slot-title

    // @show
    // @hide
    // @visible-change
  },

  data() {
    return {
      popperOptions: {
        modifiers: {
          offset: { offset: `${this.positionLeft},${this.positionTop}` },
        },
      },
    };
  },

  computed: {
    popperClasses() {
      return [
        this._addPrefix('popper'),
        {
          [this._addPrefix('popper-white')]: this.white,
          [this._addPrefix('popper-inline')]: this.inline,
        },
      ];
    },
  },

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
      directives: [
        { name: 'show', value: this.currentVisible },
        { name: 'transfer-dom' },
      ],
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
          appear
          enterActiveClass="animated in"
          leaveActiveClass="animated fade"
        >
          <div {...popperData}>
            <div {...arrowData} />
            <div class={this._addPrefix('inner')}>
              {this.title || this.$slots.title}
            </div>
          </div>
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
