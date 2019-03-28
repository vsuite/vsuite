import Vue from 'vue';
import _ from 'lodash';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { STATUS_ICON_NAMES } from 'utils/constant';

import Notification from '../Notification/Notification.jsx';

const CLASS_PREFIX = defaultClassPrefix('notification');
const PLACEMENT_TYPES = {
  TOP: 'top',
  BOTTOM: 'bottom',
};
const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

let alertStore = {};
let DEFAULT_DURATION = 2000;
let DEFAULT_TOP = 5;
let DEFAULT_BOTTOM = 5;
let DEFAULT_PLACEMENT = PLACEMENT_TYPES.TOP;

function addPrefix(cls) {
  return prefix(CLASS_PREFIX, cls);
}

function formatStyleVal(val) {
  if (typeof val === 'number') return `${val}px`;

  return val;
}

function getPlacementStyle(config) {
  let style = {};
  let className = '';
  const placement = _.camelCase(config.placement || DEFAULT_PLACEMENT);
  const top = config.top || DEFAULT_TOP;
  const bottom = config.bottom || DEFAULT_BOTTOM;

  if (placement === PLACEMENT_TYPES.BOTTOM) {
    style = {
      bottom: formatStyleVal(bottom),
    };
    className = addPrefix('bottom');
  } else {
    style = {
      top: formatStyleVal(top),
    };
    className = addPrefix('top');
  }

  return { style, className };
}

function createAlertInstance(config) {
  const placement = _.camelCase(config.placement || DEFAULT_PLACEMENT);

  if (alertStore[placement]) return alertStore[placement];

  const wrapper = new Vue({
    render: h => {
      const { style, className } = getPlacementStyle(config);
      const notificationData = {
        class: [addPrefix('alert'), className],
        style,
        props: { classPrefix: CLASS_PREFIX },
      };

      return <Notification {...notificationData} />;
    },
  });
  const component = wrapper.$mount();

  document.body.appendChild(component.$el);

  const notification = wrapper.$children[0];

  alertStore[placement] = {
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

  return alertStore[placement];
}

function notice(options) {
  let instance = createAlertInstance(options);
  let key = null;

  key = instance.notice(_.merge({ duration: DEFAULT_DURATION }, options || {}));

  return { remove: () => instance.remove(key) };
}

function getOptions(content, duration, onClose) {
  let options = {};

  if (_.isPlainObject(onClose)) {
    options = onClose;
    onClose = undefined;
  }

  if (_.isPlainObject(duration)) {
    options = duration;
    duration = undefined;
    onClose = undefined;
  }

  if (_.isPlainObject(content)) {
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

function decoratorContent(options, decorator) {
  if (!options.content || !decorator) return options;
  if (_.isArray(options.content)) options.content.unshift(decorator);
  else options.content = [decorator, options.content];

  return options;
}

export default {
  open(...args) {
    return notice(getOptions(...args));
  },

  loading(...args) {
    return notice(
      decoratorContent(getOptions(...args), h => (
        <Loader size="xs" style={{ position: 'absolute', left: '20px' }} />
      ))
    );
  },

  success(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.SUCCESS;

    return notice(
      decoratorContent(options, h => (
        <Icon icon={STATUS_ICON_NAMES[options.type]} />
      ))
    );
  },

  info(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.INFO;

    return notice(
      decoratorContent(options, h => (
        <Icon icon={STATUS_ICON_NAMES[options.type]} />
      ))
    );
  },

  warning(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.WARNING;

    return notice(
      decoratorContent(options, h => (
        <Icon icon={STATUS_ICON_NAMES[options.type]} />
      ))
    );
  },

  warn(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.WARNING;

    return notice(
      decoratorContent(options, h => (
        <Icon icon={STATUS_ICON_NAMES[options.type]} />
      ))
    );
  },

  error(...args) {
    const options = getOptions(...args);

    options.type = ALERT_TYPES.ERROR;

    return notice(
      decoratorContent(options, h => (
        <Icon icon={STATUS_ICON_NAMES[options.type]} />
      ))
    );
  },

  remove(key, placement) {
    if (placement) {
      placement = _.camelCase(placement || '');
    }

    if (placement) {
      alertStore[placement] && alertStore[placement].remove(key);

      return;
    }

    Object.keys(alertStore).map(placement => {
      alertStore[placement] && alertStore[placement].remove(key);
    });
  },

  config(options) {
    if (options.top !== undefined) {
      DEFAULT_TOP = options.top;
    }

    if (options.bottom !== undefined) {
      DEFAULT_BOTTOM = options.bottom;
    }

    if (options.placement !== undefined) {
      DEFAULT_PLACEMENT = options.placement;
    }

    if (options.duration !== undefined) {
      DEFAULT_DURATION = options.duration;
    }
  },

  destroy(placement) {
    if (placement && alertStore[placement]) {
      alertStore[placement].destroy();
      alertStore[placement] = null;

      return;
    }

    Object.keys(alertStore).map(placement => {
      alertStore[placement] && alertStore[placement].destroy();
      alertStore[placement] = null;
    });
  },
};
