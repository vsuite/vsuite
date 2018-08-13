import Vue from 'vue';
import Icon from 'components/Icon';
import renderX from 'utils/render';
import { STATUS_TYPES, STATUS_ICON_NAMES } from 'utils/constant';

import Modal from './Modal.jsx';

const modalStore = {
  instance: null,
};

function createModalInstance(config) {
  if (modalStore.instance) return modalStore.instance;

  const wrapper = new Vue({
    data() {
      return { visible: false };
    },

    render(h) {
      const {
        title,
        content,
        confirm,
        header,
        footer,
        closable,
        overflow,
        keyboard,
        full,
        drag,
        loading,
        size,
        okText,
        cancelText,
        showCancel,
        onOk,
        onCancel,
      } = config;
      const modalData = {
        props: {
          visible: this.visible,
          confirm,
          header,
          footer,
          closable,
          overflow,
          keyboard,
          full,
          drag,
          loading,
          size,
          okText,
          cancelText,
          showCancel,
        },
        on: {
          ok: onOk,
          cancel: onCancel,
          change: val => (this.visible = val),
        },
      };

      return (
        <Modal {...modalData}>
          <template slot="title">{renderX(h, title)}</template>
          <template>{renderX(h, content)}</template>
        </Modal>
      );
    },
  });
  const component = wrapper.$mount();

  document.body.appendChild(component.$el);

  const modal = wrapper.$children[0];
  let timer = null;

  modalStore.instance = {
    component: modal,
    show() {
      modal.$parent.visible = true;

      if (timer) {
        clearTimeout(timer);

        timer = null;
      }
    },
    remove() {
      modal.$parent.visible = false;

      if (timer) return;

      // animation duration
      timer = setTimeout(() => this.destroy(), 300);
    },
    destroy() {
      timer = null;
      document.body.removeChild(component.$el);
    },
  };
}

function modal(config) {
  config = config || {};

  if (config.type) {
    config.confirm = true;
    config.showCancel = false;

    config.title = function(h) {
      return [<Icon icon={STATUS_ICON_NAMES[config.type]} />, config.title];
    };
  }

  let instance = createModalInstance(config);

  instance.show();
}

export default {
  open(config) {
    modal(config);
  },
  success(config) {
    config.type = STATUS_TYPES.SUCCESS;

    modal(config);
  },
  error(config) {
    config.type = STATUS_TYPES.ERROR;

    modal(config);
  },
  info(config) {
    config.type = STATUS_TYPES.INFO;

    modal(config);
  },
  warning(config) {
    config.type = STATUS_TYPES.WARNING;

    modal(config);
  },
  warn(config) {
    config.type = STATUS_TYPES.WARN;

    modal(config);
  },
  remove() {
    if (!modalStore.instance) return;

    modalStore.instance.remove();

    modalStore.instance = null;
  },
};
