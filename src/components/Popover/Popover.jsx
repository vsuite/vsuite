import VueTypes from 'vue-types';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import renderX, { RenderX } from 'utils/render';

const CLASS_PREFIX = 'popover';

export default {
  name: 'Popover',

  model: {
    prop: 'visible',
    event: 'change',
  },

  mixins: [popperMixin],

  props: {
    // eslint-disable-next-line
    trigger: {
      ...popperMixin.props.trigger,
      default: 'click',
    },
    title: RenderX,
    content: RenderX,
    inline: VueTypes.bool.def(false),
    full: VueTypes.bool.def(false),
    maxWidth: VueTypes.number.def(0),
    innerStyle: VueTypes.object.def({}),
    positionLeft: VueTypes.number,
    positionTop: VueTypes.number.def(2),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
    // slot-title
    // slot-content

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
          [this._addPrefix('popper-inline')]: this.inline,
          [this._addPrefix('popper-full')]: this.full,
        },
      ];
    },
  },

  render(h) {
    if (this.inline) return this._renderPopover(h);

    const popoverData = {
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
    const innerData = {
      class: this._addPrefix('inner'),
      style: {
        ...this.innerStyle,
        maxWidth: this.maxWidth === 0 ? 'none' : `${this.maxWidth}px`,
      },
    };

    this._addTriggerListeners(referenceData, popoverData);

    return (
      <div {...popoverData}>
        <div {...referenceData}>{this.$slots.default}</div>
        <transition
          appear
          enterActiveClass="animated in"
          leaveActiveClass="animated fade"
        >
          <div {...popperData}>
            <div {...arrowData} />
            <div {...innerData}>
              {this.$slots.title ||
                (this.title ? (
                  <h3 class={this._addPrefix('title')}>
                    {renderX(h, this.title)}
                  </h3>
                ) : null)}
              <div class={this._addPrefix('content')}>
                {this.$slots.content || renderX(h, this.content)}
              </div>
            </div>
          </div>
        </transition>
      </div>
    );
  },

  methods: {
    _renderPopover() {
      const data = {
        class: this.popperClasses,
        attrs: {
          'x-placement': this.placement,
        },
      };
      const innerData = {
        class: this._addPrefix('inner'),
        style: {
          ...this.innerStyle,
          maxWidth: this.maxWidth === 0 ? 'none' : `${this.maxWidth}px`,
        },
      };

      return (
        <div {...data}>
          <div class={this._addPrefix('arrow')} />
          <div {...innerData}>
            {this.$slots.title ||
              (this.title ? (
                <h3 class={this._addPrefix('title')}>{this.title}</h3>
              ) : null)}
            <div class={this._addPrefix('content')}>
              {this.$slots.content || this.content}
            </div>
          </div>
        </div>
      );
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
