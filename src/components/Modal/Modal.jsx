import VueTypes from 'vue-types';
import {
  addStyle,
  hasClass,
  getHeight,
  getContainer, // FIXME: support string
  ownerDocument,
  isOverflowing,
  getScrollbarSize,
} from 'dom-lib';
import Button from 'components/Button';
import { transferDom } from 'directives';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import renderX, { RenderX } from 'utils/render';
import { SIZES } from 'utils/constant';

import manager from './manager';

const CLASS_PREFIX = 'modal';

export default {
  name: 'Modal',

  model: {
    prop: 'visible',
    event: 'change',
  },

  directives: { transferDom },

  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    title: RenderX,
    backdrop: VueTypes.oneOfType([
      VueTypes.bool,
      VueTypes.oneOf(['static']),
    ]).def(true),
    closable: VueTypes.bool,
    overflow: VueTypes.bool,
    keyboard: VueTypes.bool,
    full: VueTypes.bool.def(false),
    // drag: VueTypes.bool.def(false), // TODO: support drag
    loading: VueTypes.bool.def(false),
    size: VueTypes.oneOf(SIZES).def('sm'),
    confirm: VueTypes.bool.def(false),
    header: VueTypes.bool,
    footer: VueTypes.bool,
    okText: VueTypes.string,
    showOk: VueTypes.bool,
    cancelText: VueTypes.string,
    showCancel: VueTypes.bool,
    container: VueTypes.any,
    // drawer
    drawer: VueTypes.bool.def(false),
    // modify
    modalClassNames: VueTypes.any,
    dialogClassNames: VueTypes.any,
    dialogStyle: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(''),
    // other
    role: VueTypes.string,
    tabindex: VueTypes.number.def(-1),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      transfer: false,
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
          [this._addPrefix('confirm')]: this.confirm,
        },
      ];
    },
    containerClasses() {
      return [
        this.visible && this._addPrefix('open'),
        this.backdrop && this._addPrefix('has-backdrop'),
      ].filter(Boolean);
    },
  },

  render(h) {
    const modalData = {
      class: this._addPrefix('wrapper'),
      directives: [
        {
          name: 'transfer-dom',
          value: getContainer(this.container, document.body),
        },
      ],
      attrs: {
        'data-transfer': `${this.transfer}`,
        role: 'dialog',
      },
      ref: 'modal',
    };
    const modalDialogData = {
      class: [this.classes, this.modalClassNames],
      style: this.modalStyles,
      attrs: {
        role: this.role || 'document',
        tabindex: this.tabindex || '-1',
      },
      directives: [{ name: 'show', value: this.visible }],
      on: { click: this._handleModalClick },
      ref: 'dialog',
    };
    const dialogData = {
      class: [this._addPrefix('dialog'), this.dialogClassNames],
      style: this.dialogStyle,
    };
    const bodyData = {
      class: this._addPrefix('body'),
      style: this.bodyStyles,
    };

    return (
      <div {...modalData}>
        {this.backdrop && this._renderBackdrop(h)}

        <transition
          appear
          enterActiveClass="animated bounce-in"
          leaveActiveClass="animated bounce-out"
          onBeforeEnter={this._handleBeforeEnter}
          onEnter={this._handleEntering}
          onAfterLeave={this._handleAfterLeave}
          onLeave={this._handleLeaving}
        >
          <div {...modalDialogData}>
            <div {...dialogData}>
              <div class={this._addPrefix('content')} role="document">
                {this.header && this._renderHeader(h)}
                <div {...bodyData}>{this.$slots.default}</div>
                {this.footer && this._renderFooter(h)}
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
        on: {
          click: this._handleModalClick,
        },
        directives: [{ name: 'show', value: this.visible }],
      };

      return (
        <transition name="fade">
          <div {...data} />
        </transition>
      );
    },

    _renderHeader(h) {
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
          {(this.title || this.$slots.title) && (
            <h4 class={this._addPrefix('title')}>
              {(this.title && renderX(h, this.title)) || this.$slots.title}
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
            this.showCancel ? (
              <Button onClick={this._handleCancel} appearance="subtle">
                {this.cancelText || this.$t('_.Modal.cancelText')}
              </Button>
            ) : null,
            this.showOk ? (
              <Button
                onClick={this._handleOk}
                loading={this.vLoading}
                appearance="primary"
              >
                {this.okText || this.$t('_.Modal.okText')}
              </Button>
            ) : null,
          ]}
        </div>
      );
    },

    _computedStyles(zoom) {
      const scale = zoom ? 0.8 : 1;
      const node = this.$refs.modal;
      const doc = ownerDocument(node);
      const container = getContainer(this.container, doc.body);
      const scrollHeight = node ? node.scrollHeight : 0;

      const bodyIsOverflowing = isOverflowing(container);
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
          let headerHeight = 20 + 20;
          let footerHeight = 20 + 20;
          let contentHeight = 20 + 20;

          const header = dialog.querySelector(`.${this._addPrefix('header')}`);
          const footer = dialog.querySelector(`.${this._addPrefix('footer')}`);
          const content = dialog.querySelector(
            `.${this._addPrefix('content')}`
          );

          headerHeight = header
            ? getHeight(header) / scale + headerHeight
            : headerHeight;
          footerHeight = footer
            ? getHeight(footer) / scale + footerHeight
            : footerHeight;
          contentHeight = content
            ? getHeight(content) / scale + contentHeight
            : contentHeight;

          if (this.drawer) {
            bodyStyles.height = `${contentHeight -
              (headerHeight + footerHeight)}px`;
          } else {
            /**
             * Header height + Footer height + Dialog margin
             */
            const excludeHeight = headerHeight + footerHeight + 60;
            const bodyHeight = getHeight(window) - excludeHeight;

            bodyStyles.maxHeight = `${
              scrollHeight >= bodyHeight ? bodyHeight : scrollHeight
            }px`;
          }
        }

        styles.bodyStyles = bodyStyles;
      }

      this.modalStyles = styles.modalStyles;
      this.bodyStyles = styles.bodyStyles;
    },

    _handleBeforeEnter() {
      this.transfer = true; // transfer modal
      this.$refs.modal && addStyle(this.$refs.modal, 'display', 'block');
      manager.add(this);
    },

    _handleEntering() {
      this._computedStyles(true);
      this.$emit('show');
    },

    _handleAfterLeave() {
      this.vLoading = false; // reset button loading
      this.transfer = false; // reset transfer
      this.$refs.modal && addStyle(this.$refs.modal, 'display', 'none');
      manager.remove(this);
    },

    _handleLeaving() {
      this.$emit('hide');
    },

    _handleModalClick(event) {
      const hasCls =
        hasClass(event.target, this.classPrefix) ||
        hasClass(event.target, this._addPrefix('backdrop'));

      if (hasCls && this.backdrop === true) this._handleClose();
    },

    _handleOk() {
      this.$emit('ok');

      if (this.loading) {
        return (this.vLoading = this.loading);
      }

      this.$emit('change', false);
    },

    _handleCancel() {
      if (this.vLoading) return;

      this.$emit('cancel');
      this.$emit('change', false);
    },

    _handleClose() {
      if (this.vLoading) return;

      this.$emit('change', false);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
