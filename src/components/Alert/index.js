import Vue from 'vue';
import _ from 'lodash';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { STATUS_ICON_NAMES } from 'utils/constant';

import Notification from '../Notification/Notification.jsx';

const CLASS_PREFIX = defaultClassPrefix('notification');
const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

let alertInstance;
let DEFAULT_DURATION = 2000;
let DEFAULT_TOP = 5;

function addPrefix(cls) {
  return prefix(CLASS_PREFIX, cls);
}

function formatStyleVal(val) {
  if (typeof val === 'number') return `${val}px`;

  return val;
}

function createAlertInstance() {
  if (alertInstance) return alertInstance;

  const wrapper = new Vue({
    render: h => {
      const notificationData = {
        class: addPrefix('alert'),
        style: { top: formatStyleVal(DEFAULT_TOP) },
        props: { classPrefix: CLASS_PREFIX },
      };

      return <Notification {...notificationData} />;
    },
  });
  const component = wrapper.$mount();

  document.body.appendChild(component.$el);

  const notification = wrapper.$children[0];

  alertInstance = {
    component: notification,
    notice(data) {
      return notification.add(data || {});
    },
    remove(key) {
      notification.remove(key);
    },
    destroy() {
      document.body.removeChild(component.$el);
    },
  };

  return alertInstance;
}

function notice(options) {
  const { content, duration = DEFAULT_DURATION, onClose, type, ...rest } =
    options || {};
  let instance = createAlertInstance();
  let key = null;

  key = instance.notice({
    content: [h => <Icon icon={STATUS_ICON_NAMES[type]} />, content],
    duration,
    type,
    onClose,
    ...rest,
  });

  return { remove: () => instance.remove(key) };
}

function getOptions(content, duration, onClose) {
  let options = {};

  if (_.isObject(onClose)) {
    options = onClose;
    onClose = undefined;
  }

  if (_.isObject(duration)) {
    options = duration;
    duration = undefined;
    onClose = undefined;
  }

  if (_.isObject(content)) {
    options = content;
    content = undefined;
    duration = undefined;
    onClose = undefined;
  }

  if (_.isFunction(duration)) {
    onClose = duration;
    duration = undefined;
  }

  if (content !== undefined) options.content = content;
  if (duration !== undefined) options.duration = duration;
  if (onClose !== undefined) options.onClose = onClose;

  return options;
}

export default {
  open(...args) {
    const options = getOptions(...args);

    return notice(options);
  },
  loading(...args) {
    const options = getOptions(...args);

    return notice(options);
  },
  success(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.SUCCESS;

    return notice(options);
  },
  info(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.INFO;

    return notice(options);
  },
  warning(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.WARNING;

    return notice(options);
  },
  warn(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.WARNING;

    return notice(options);
  },
  error(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.ERROR;

    return notice(options);
  },
  config(options) {
    if (options.top) {
      DEFAULT_TOP = options.top;
    }

    if (options.duration) {
      DEFAULT_DURATION = options.duration;
    }
  },
  destroy() {
    if (!alertInstance) return;

    alertInstance.destroy();

    alertInstance = null;
  },
};
