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
let DEFAULT_REMOVE_ON_EMPTY = true;

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

function getOptions(content, duration, onClose, option) {
  let options = option || {};

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

function createAlertInstance(config) {
  const placement = _.camelCase(config.placement || DEFAULT_PLACEMENT);

  if (alertStore[placement]) return alertStore[placement];

  const wrapper = new Vue({
    render() {
      const { style, className } = getPlacementStyle(config);
      const notificationData = {
        class: [addPrefix('alert'), className],
        style,
        props: { classPrefix: CLASS_PREFIX },
        on: {
          empty: () =>
            (DEFAULT_REMOVE_ON_EMPTY &&
              alertStore[placement] &&
              alertStore[placement].destroy()) ||
            (alertStore[placement] = null),
        },
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
  options = options || {};

  let instance = createAlertInstance(options);
  let key = null;

  key = instance.notice(_.merge({ duration: DEFAULT_DURATION }, options || {}));

  return { remove: () => instance.remove(key) };
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
    const type = ALERT_TYPES.SUCCESS;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorContent(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  warning(...args) {
    const type = ALERT_TYPES.WARNING;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorContent(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  warn(...args) {
    const type = ALERT_TYPES.WARNING;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorContent(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  error(...args) {
    const type = ALERT_TYPES.ERROR;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorContent(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  info(...args) {
    const type = ALERT_TYPES.INFO;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorContent(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
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

  config(options = {}, remove = true) {
    remove &&
      Object.keys(alertStore).map(placement => {
        alertStore[placement] && alertStore[placement].destroy();
        alertStore[placement] = null;
      });

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

    if (options.removeOnEmpty !== undefined) {
      DEFAULT_REMOVE_ON_EMPTY = options.removeOnEmpty;
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
