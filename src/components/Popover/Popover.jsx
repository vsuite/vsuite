import VueTypes from 'vue-types';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { addStyle, getAttr } from 'shares/dom';

const CLASS_PREFIX = 'popover';

export default {
  name: 'Popover',

  mixins: [popperMixin],

  props: {
    /* eslint-disable vue/require-prop-types */
    trigger: {
      default: 'click',
    },
    title: VueTypes.string,
    content: VueTypes.string,
    full: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    popperClasses() {
      return [
        this._addPrefix('popper'),
        {
          [this._addPrefix('popper-full')]: this.full,
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
      class: 'arrow',
      ref: 'arrow',
    };

    this._addTriggerListeners(referenceData, popoverData);

    return (
      <div {...popoverData}>
        <div {...referenceData}>{this.$slots.default}</div>
        <transition name="popover-fade">
          <div {...popperData}>
            <div {...arrowData} />
            {this.$slots.title ||
              (this.title ? (
                <h3 class={this._addPrefix('title')}>{this.title}</h3>
              ) : null)}
            <div class={this._addPrefix('content')}>
              {this.$slots.content || this.content}
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
