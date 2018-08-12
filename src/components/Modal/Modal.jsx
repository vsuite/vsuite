import VueTypes from 'vue-types';
import Button from 'components/Button';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { SIZES } from 'utils/constant';

const CLASS_PREFIX = 'modal';

export default {
  name: 'Modal',

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    defaultVisible: VueTypes.bool.def(false),
    title: VueTypes.string, // slot
    // header slot
    // default slot
    // footer slot
    backdrop: VueTypes.oneOfType([
      VueTypes.bool,
      VueTypes.oneOf(['static']),
    ]).def(true),
    closable: VueTypes.bool,
    overflow: VueTypes.bool,
    keyboard: VueTypes.bool,
    full: VueTypes.bool.def(false),
    drag: VueTypes.bool.def(false),
    loading: VueTypes.bool.def(false),
    size: VueTypes.oneOf(SIZES).def('sm'),
    transfer: VueTypes.bool.def(function() {
      return this.$VSUITE.transfer || false;
    }),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // ok
    // cancel
    // change
    // show
    // hide
  },

  data() {
    return {
      innerVal: this.defaultVisible || false,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.size)]: this.size,
        },
      ];
    },
    currentVal() {
      return typeof this.visible === 'undefined' ? this.innerVal : this.visible;
    },
  },

  render(h) {
    const dialogData = {
      directives: [{ name: 'transfer-dom' }],
      attrs: {
        role: 'dialog',
        'data-transfer': `${this.transfer}`,
      },
    };
    const modalData = {
      class: this.classes,
      style: { display: 'block' },
      attrs: {
        role: 'dialog',
      },
      directives: [{ name: 'show', value: this.currentVal }],
    };

    return (
      <div {...dialogData}>
        {this.backdrop && this._renderBackdrop(h)}
        <transition
          appear
          type="animation"
          appearClass="fade"
          appearActiveClass="fade in"
          appearToClass="fade in"
        >
          <div {...modalData}>
            <div class={this._addPrefix('dialog')}>
              <div class={this._addPrefix('content')} role="document">
                <div class={this._addPrefix('header')}>
                  {this.closable && (
                    <button
                      type="button"
                      class={this._addPrefix('close')}
                      aria-label="Close"
                      onClick={this._handleClose}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  )}
                  {this.title && (
                    <h4 class={this._addPrefix('title')}>{this.title}</h4>
                  )}
                  {this.$slots.header}
                </div>
                <div class={this._addPrefix('body')}>{this.$slots.default}</div>
                <div class={this._addPrefix('footer')}>
                  {this.$slots.footer || [
                    <Button onClick={this._handleClose} appearance="subtle">
                      Cancel
                    </Button>,
                    <Button onClick={this._handleOk} appearance="primary">
                      Ok
                    </Button>,
                  ]}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    );
  },

  methods: {
    _renderBackdrop() {
      const data = {
        class: this._addPrefix('backdrop'),
        attrs: {
          role: 'button',
          tabindex: '-1',
        },
        directives: [{ name: 'show', value: this.currentVal }],
      };

      return (
        <transition
          appear
          type="transition"
          appearClass="fade"
          appearActiveClass="fade in"
          appearToClass="fade in"
        >
          <div {...data} />
        </transition>
      );
    },

    _handleOk() {},

    _handleClose() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
