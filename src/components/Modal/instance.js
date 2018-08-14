import Vue from 'vue';
import Icon from 'components/Icon';
import renderX from 'utils/render';

import Modal from './Modal.jsx';

const STATUS_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  WARN: 'warning',
  ERROR: 'error',
  INFO: 'info',
  CONFIRM: 'confirm',
};
const ICON_NAMES = {
  info: 'info',
  success: 'check-circle',
  error: 'close-circle',
  warning: 'remind',
  confirm: 'question-circle',
};
const ICON_STATUS = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
  warn: 'warning',
  confirm: 'warning',
};
const modalStore = {
  instance: null,
};

function createModalInstance(config) {
  if (modalStore.instance) return modalStore.instance;

  const wrapper = new Vue({
    data() {
      return { visible: false };
    },

    watch: {
      visible(val) {
        if (!val) return this.remove();
      },
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
              icon={ICON_NAMES[config.type]}
              status={ICON_STATUS[config.type]}
            />
            {renderX(h, title)}
          </template>
          <template slot="default">{renderX(h, content)}</template>
        </Modal>
      );
    },

    methods: {
      remove() {
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

  modalStore.instance = {
    component: modal,
    show() {
      modal.$parent.visible = true;
    },
    remove() {
      modal.$parent.visible = false;
    },
  };

  return modalStore.instance;
}

function modal(config) {
  config = config || {};

  if (config.type) {
    config.confirm = true;
    config.showCancel = config.type === STATUS_TYPES.CONFIRM;
    config.size = config.size || 'xs';
  }

  let instance = createModalInstance(config);

  instance.show();
}

export default {
  open(config) {
    modal(config);
  },
  confirm(config) {
    config.type = STATUS_TYPES.CONFIRM;

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
