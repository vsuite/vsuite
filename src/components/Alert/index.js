import Vue from 'vue';
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
        props: {
          duration: DEFAULT_DURATION,
          classPrefix: CLASS_PREFIX,
        },
      };

      return <Notification {...notificationData} />;
    },
  });
  const component = wrapper.$mount();

  document.body.appendChild(component.$el);

  const notification = wrapper.$children[0];

  alertInstance = {
    notice(data) {
      notification.add(data || {});
    },
    remove(key) {
      notification.remove(key);
    },
    component: notification,
    destroy() {
      document.body.removeChild(component.$el);
    },
  };

  return alertInstance;
}

function notice(content, duration = DEFAULT_DURATION, onClose, type) {
  let instance = createAlertInstance();

  instance.notice({
    content: [h => <Icon icon={STATUS_ICON_NAMES[type]} />, content],
    duration,
    type,
    closable: true,
    onClose,
  });
}

export default {
  success(content, duration, onClose) {
    notice(content, duration, onClose, ALERT_TYPES.SUCCESS);
  },
  error(content, duration, onClose) {
    notice(content, duration, onClose, ALERT_TYPES.ERROR);
  },
  info(content, duration, onClose) {
    notice(content, duration, onClose, ALERT_TYPES.INFO);
  },
  warning(content, duration, onClose) {
    notice(content, duration, onClose, ALERT_TYPES.WARNING);
  },
  warn(content, duration, onClose) {
    notice(content, duration, onClose, ALERT_TYPES.WARNING);
  },
  config(options) {
    if (options.top) {
      DEFAULT_TOP = options.top;
    }

    if (options.duration) {
      DEFAULT_DURATION = options.duration;
    }
  },
};
