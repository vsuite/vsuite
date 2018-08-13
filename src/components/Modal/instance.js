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
          cancel: this.remove,
          change: val => (this.visible = val),
        },
      };

      if (onOk) {
        modalData.on.ok = onOk;
      }

      if (onCancel) {
        modalData.on.cancel = onCancel;
      }

      return (
        <Modal {...modalData}>
          <template slot="title">
            <Icon
              style={{ fontSize: '24px', marginRight: '15px' }}
              icon={STATUS_ICON_NAMES[config.type]}
              status={config.type}
            />
            {renderX(h, title)}
          </template>
          <template slot="default">{renderX(h, content)}</template>
        </Modal>
      );
    },

    methods: {
      remove() {
        this.visible = false;
        // animation duration
        setTimeout(() => this.destroy(), 300);
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);

        modalStore.instance = null;
      },
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
    },
    remove() {
      if (timer) return;

      modal.$parent.remove();
    },
  };

  return modalStore.instance;
}

function modal(config) {
  config = config || {};

  if (config.type) {
    config.confirm = true;
    config.showCancel = false;
    config.size = config.size || 'xs';
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
  },
};
