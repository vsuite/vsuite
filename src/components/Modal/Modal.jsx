import VueTypes from 'vue-types';
import Button from 'components/Button';
import { transferDom } from 'directives';
import { addStyle } from 'shares/dom';
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

  directives: { transferDom },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.size)]: this.size,
        },
      ];
    },
  },

  render(h) {
    const dialogWrapperData = {
      directives: [{ name: 'transfer-dom' }],
      attrs: {
        role: 'dialog',
        'data-transfer': `${this.transfer}`,
      },
    };
    const modalData = {
      class: this.classes,
      attrs: {
        role: 'dialog',
      },
      ref: 'modal',
    };
    const dialogData = {
      class: this._addPrefix('dialog'),
      directives: [{ name: 'show', value: this.visible }],
    };

    return (
      <div {...dialogWrapperData}>
        {this.backdrop && this._renderBackdrop(h)}

        <div {...modalData}>
          <transition
            type="animation"
            name="fade"
            onBeforeEnter={this._handleBeforeEnter}
            onAfterLeave={this._handleAfterLeave}
          >
            <div {...dialogData}>
              <div class={this._addPrefix('content')} role="document">
                <div class={this._addPrefix('header')}>
                  {this.closable && (
                    <button
                      type="button"
                      class={this._addPrefix('header-close')}
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
          </transition>
        </div>
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
        directives: [{ name: 'show', value: this.visible }],
      };

      return (
        <transition name="fade">
          <div {...data} />
        </transition>
      );
    },

    _handleBeforeEnter() {
      addStyle(this.$refs.modal, 'display', 'block');
    },

    _handleAfterLeave() {
      addStyle(this.$refs.modal, 'display', 'none');
    },

    _handleOk() {},

    _handleClose() {
      this.$emit('change', false);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
