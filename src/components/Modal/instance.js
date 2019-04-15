import Vue from 'vue';
import { getContainer } from 'dom-lib';
import Icon from 'components/Icon';
import renderX from 'utils/render';
import prefix, { defaultClassPrefix, globalKey } from 'utils/prefix';

import Modal from './Modal.jsx';
import _ from 'lodash';

const CLASS_PREFIX = defaultClassPrefix('modal');
const MODAL_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  CONFIRM: 'confirm',
};
const STATUS_ICON_NAMES = {
  success: 'check-circle',
  warning: 'remind',
  error: 'close-circle',
  info: 'info',
  confirm: 'question-circle2',
};
const modalStore = {
  instances: [],
};
let id = 0;

const getUid = () => {
  id += 1;
  return `${globalKey}notification-${Date.now()}-${id}`;
};

function addPrefix(cls) {
  return prefix(CLASS_PREFIX, cls);
}

function getOptions(title, content, option) {
  let options = option || {};

  if (_.isPlainObject(content)) {
    options = content;
    content = undefined;
  }

  if (_.isPlainObject(title)) {
    options = title;
    content = undefined;
    title = undefined;
  }

  if (title !== undefined) options.title = title;
  if (content !== undefined) options.content = content;

  return options;
}

function decoratorTitle(options, decorator) {
  if (!options.title || !decorator) return options;
  if (_.isArray(options.title)) options.title.unshift(decorator);
  else options.title = [decorator, options.title];

  return options;
}

function createModalInstance(config) {
  let instance = null;

  if (config.key) {
    instance = modalStore.instances.filter(x => x.key === config.key)[0];

    if (instance) return instance;
  }

  const key = config.key || getUid();
  const $container = getContainer(config.container, document.body);
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
        backdrop,
        closable,
        overflow,
        keyboard,
        full,
        loading,
        size,
        header,
        footer,
        okText,
        okProps,
        showOk,
        cancelText,
        cancelProps,
        showCancel,
        container,
        modalClassNames,
        onOk,
        onCancel,
      } = config;
      const modalData = {
        props: {
          visible: this.visible,
          backdrop,
          closable,
          overflow,
          keyboard,
          full,
          loading,
          size,
          header: header !== false,
          footer: footer !== false,
          okText,
          okProps,
          showOk,
          cancelText,
          cancelProps,
          showCancel,
          container,
          modalClassNames,
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
          {title && <template slot="title">{renderX(h, title)}</template>}
          {content && <template slot="default">{renderX(h, content)}</template>}
          {!!header && <teamplte slot="header">{renderX(h, header)}</teamplte>}
          {!!footer && <template slot="footer">{renderX(h, footer)}</template>}
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
        $container.removeChild(this.$el);

        let index = modalStore.instances.indexOf(instance);

        if (index === -1) return;

        modalStore.instances.splice(index, 1);
      },
    },
  });
  const component = wrapper.$mount();

  $container.appendChild(component.$el);

  // const modal = wrapper.$children[0];
  instance = {
    key,
    component: wrapper,
    show: () => {
      wrapper.visible = true;
    },
    remove: () => {
      wrapper.visible = false;
    },
  };

  modalStore.instances.push(instance);

  return instance;
}

function modal(config) {
  config = config || {};

  if (config.type) {
    config.showCancel = config.type === MODAL_TYPES.CONFIRM;
    config.size = config.size || 'xs';
    config.modalClassNames = addPrefix(config.type);
    config.closable = false;

    delete config.type;
    delete config.render;
  }

  if (config.render) {
    config.title = null;
    config.content = config.render;

    delete config.render;
  }

  let instance = createModalInstance(config);

  instance.show();

  return { remove: () => instance.remove() };
}

export default {
  open(...args) {
    return modal(getOptions(...args));
  },

  confirm(...args) {
    const type = MODAL_TYPES.CONFIRM;
    const options = getOptions(...args);

    options.type = type;

    return modal(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  success(...args) {
    const type = MODAL_TYPES.SUCCESS;
    const options = getOptions(...args);

    options.type = type;

    return modal(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  warning(...args) {
    const type = MODAL_TYPES.WARNING;
    const options = getOptions(...args);

    options.type = type;

    return modal(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  warn(...args) {
    const type = MODAL_TYPES.WARNING;
    const options = getOptions(...args);

    options.type = type;

    return modal(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  error(...args) {
    const type = MODAL_TYPES.ERROR;
    const options = getOptions(...args);

    options.type = type;

    return modal(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  info(...args) {
    const type = MODAL_TYPES.INFO;
    const options = getOptions(...args);

    options.type = type;

    return modal(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  remove(key) {
    const instance = (key
      ? modalStore.instances.filter(x => x.key === key)
      : [modalStore.instances[modalStore.instances.length - 1]])[0];

    if (!instance) return;

    instance.remove();
  },
};
