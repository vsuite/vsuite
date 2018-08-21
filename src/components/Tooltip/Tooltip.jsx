import VueTypes from 'vue-types';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { addStyle, getAttr } from 'shares/dom';

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
    theme: VueTypes.oneOf(['dark', 'light']).def('dark'),
    maxWidth: VueTypes.number.def(250),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    popperClasses() {
      return [
        this._addPrefix('popper'),
        {
          [this._addPrefix(`popper-theme-${this.theme}`)]: this.theme,
        },
      ];
    },
    innerClasses() {
      return [
        this._addPrefix('inner'),
        {
          [this._addPrefix('inner-with-width')]: !!this.maxWidth,
        },
      ];
    },
  },

  // FIXME: check dynamic change the title property
  watch: {
    currentVisible(val) {
      const popper = this.$refs.popper;
      const placement = getAttr(popper, 'x-placement');

      if (!val && popper) {
        if (~placement.indexOf('top')) {
          addStyle(popper, { top: '2px' });
        }

        if (~placement.indexOf('bottom')) {
          addStyle(popper, { top: '-2px' });
        }

        if (~placement.indexOf('right')) {
          addStyle(popper, { left: '-2px' });
        }

        if (~placement.indexOf('left')) {
          addStyle(popper, { left: '2px' });
        }
      }
    },
  },

  render() {
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
        <transition name="tooltip-fade">
          <div {...popperData}>
            <div {...arrowData} />
            <div class={this.innerClasses}>{this.title}</div>
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
