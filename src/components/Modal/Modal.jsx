import VueTypes from 'vue-types';
import Button from 'components/Button';
import { transferDom } from 'directives';
import {
  on,
  addStyle,
  hasClass,
  ownerDocument,
  isOverflowing,
  getHeight,
  getScrollbarSize,
} from 'shares/dom';
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
    title: VueTypes.string,
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
    header: VueTypes.bool,
    footer: VueTypes.bool,
    okText: VueTypes.string,
    cancelText: VueTypes.string,
    transfer: VueTypes.bool.def(function() {
      return this.$VSUITE.transfer || false;
    }),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  directives: { transferDom },

  data() {
    return {
      vLoading: false,
      modalStyles: {},
      bodyStyles: {},
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.size)]: this.size,
          [this._addPrefix('full')]: this.full,
        },
      ];
    },
  },

  watch: {
    visible(val) {
      // reset loading status
      this.vLoading = false;

      if (val) {
        this.$emit('show');
        this._handleAddResizeListener();
        this._handleAddDocumentKeyup();
      } else {
        this.$emit('hide');
        this._handleRemoveResizeListener();
        this._handleRemoveDocumentKeyup();
      }
    },
  },

  render(h) {
    const modalWrapperData = {
      directives: [{ name: 'transfer-dom' }],
      attrs: {
        role: 'dialog',
        'data-transfer': `${this.transfer}`,
      },
    };
    const modalData = {
      class: this.classes,
      style: this.modalStyles,
      attrs: {
        role: 'dialog',
      },
      on: { click: this._handleModalClick },
      ref: 'modal',
    };
    const dialogData = {
      class: this._addPrefix('dialog'),
      directives: [{ name: 'show', value: this.visible }],
      ref: 'dialog',
    };
    const bodyData = {
      class: this._addPrefix('body'),
      style: this.bodyStyles,
    };

    return (
      <div {...modalWrapperData}>
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
                {this.header && this._renderHeader(h)}
                <div {...bodyData}>{this.$slots.default}</div>
                {this.footer && this._renderFooter(h)}
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
        on: {
          click: this._handleClose,
        },
        directives: [{ name: 'show', value: this.visible }],
      };

      return (
        <transition name="fade">
          <div {...data} />
        </transition>
      );
    },

    _renderHeader() {
      return (
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
            <h4 class={this._addPrefix('title')}>
              {this.title || this.$slots.title}
            </h4>
          )}
          {this.$slots.header}
        </div>
      );
    },

    _renderFooter() {
      return (
        <div class={this._addPrefix('footer')}>
          {this.$slots.footer || [
            <Button onClick={this._handleClose} appearance="subtle">
              {this.cancelText || this.$t('_.Modal.cancel_text')}
            </Button>,
            <Button
              onClick={this._handleOk}
              loading={this.vLoading}
              appearance="primary"
            >
              {this.okText || this.$t('_.Modal.ok_text')}
            </Button>,
          ]}
        </div>
      );
    },

    _computedStyles() {
      const node = this.$refs.modal;
      const doc = ownerDocument(node);
      const body = doc.body;
      const scrollHeight = node ? node.scrollHeight : 0;

      const bodyIsOverflowing = isOverflowing(body);
      const modalIsOverflowing =
        scrollHeight > doc.documentElement.clientHeight;
      const scrollbarSize = getScrollbarSize();

      const styles = {
        modalStyles: {
          paddingRight: `${
            bodyIsOverflowing && !modalIsOverflowing ? scrollbarSize : 0
          }px`,
          paddingLeft: `${
            !bodyIsOverflowing && modalIsOverflowing ? scrollbarSize : 0
          }px`,
        },
        bodyStyles: {},
      };

      if (this.overflow) {
        const dialog = this.$refs.dialog;
        const bodyStyles = {
          overflow: 'auto',
        };

        if (dialog) {
          // default margin
          let headerHeight = 46;
          let footerHeight = 46;

          const header = dialog.querySelector(`.${this._addPrefix('header')}`);
          const footer = dialog.querySelector(`.${this._addPrefix('footer')}`);

          headerHeight = header
            ? getHeight(header) + headerHeight
            : headerHeight;
          footerHeight = footer
            ? getHeight(footer) + headerHeight
            : headerHeight;

          /**
           * Header height + Footer height + Dialog margin
           */
          const excludeHeight = headerHeight + footerHeight + 60;
          const bodyHeight = getHeight(window) - excludeHeight;

          bodyStyles.maxHeight = `${
            scrollHeight >= bodyHeight ? bodyHeight : scrollHeight
          }px`;
        }

        styles.bodyStyles = bodyStyles;
      }

      this.modalStyles = styles.modalStyles;
      this.bodyStyles = styles.bodyStyles;
    },

    _handleAddResizeListener() {
      this.windowResizeListener = on(
        window,
        'resize',
        this._handleWindowResize
      );

      this.$nextTick(() => this._computedStyles());
    },

    _handleRemoveResizeListener() {
      if (this.windowResizeListener) {
        this.windowResizeListener.off();

        this.windowResizeListener = null;
      }
    },

    _handleWindowResize() {
      this._computedStyles();
    },

    _handleAddDocumentKeyup() {
      this.documentKeydownListener = on(
        document,
        'keyup',
        this._handleDocumentKeyup
      );
    },

    _handleRemoveDocumentKeyup() {
      if (this.documentKeydownListener) {
        this.documentKeydownListener.off();

        this.documentKeydownListener = null;
      }
    },

    _handleDocumentKeyup(event) {
      if (this.keyboard && event.keyCode === 27) {
        this._handleClose();
      }
    },

    _handleBeforeEnter() {
      addStyle(this.$refs.modal, 'display', 'block');
    },

    _handleAfterLeave() {
      addStyle(this.$refs.modal, 'display', 'none');
    },

    _handleModalClick(event) {
      if (hasClass(event.target, this.classPrefix) && this.backdrop === true)
        this._handleClose();
    },

    _handleOk() {
      this.$emit('ok');

      if (this.loading) {
        return (this.vLoading = this.loading);
      }

      this.$emit('change', false);
    },

    _handleClose() {
      if (this.vLoading) return;

      this.$emit('cancel');
      this.$emit('change', false);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
