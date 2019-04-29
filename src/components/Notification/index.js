import Vue from 'vue';
import _ from 'lodash';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import renderX from 'utils/render';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { STATUS_ICON_NAMES } from 'utils/constant';

import Notification from './Notification.jsx';

const CLASS_PREFIX = defaultClassPrefix('notification');
const PLACEMENT_TYPES = {
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
};
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
};

let notificationStore = {};
let DEFAULT_DURATION = 4500;
let DEFAULT_TOP = 24;
let DEFAULT_BOTTOM = 24;
let DEFAULT_LEFT = 24;
let DEFAULT_RIGHT = 24;
let DEFAULT_PLACEMENT = PLACEMENT_TYPES.TOP_RIGHT;
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
  const right = config.right || DEFAULT_RIGHT;
  const bottom = config.bottom || DEFAULT_BOTTOM;
  const left = config.left || DEFAULT_LEFT;

  if (placement === PLACEMENT_TYPES.TOP_LEFT) {
    style = {
      top: formatStyleVal(top),
      left: formatStyleVal(left),
    };
    className = addPrefix('top-left');
  } else if (placement === PLACEMENT_TYPES.TOP_RIGHT) {
    style = {
      top: formatStyleVal(top),
      right: formatStyleVal(right),
    };
    className = addPrefix('top-right');
  } else if (placement === PLACEMENT_TYPES.BOTTOM_LEFT) {
    style = {
      bottom: formatStyleVal(bottom),
      left: formatStyleVal(left),
    };
    className = addPrefix('bottom-left');
  } else if (placement === PLACEMENT_TYPES.BOTTOM_RIGHT) {
    style = {
      bottom: formatStyleVal(bottom),
      right: formatStyleVal(right),
    };
    className = addPrefix('bottom-right');
  } else {
    style = {
      top: formatStyleVal(top),
      left: formatStyleVal(left),
    };
  }

  return { style, className };
}

function getOptions(title, description, duration, onClose, option) {
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

  if (_.isPlainObject(description)) {
    options = description;
    description = undefined;
    duration = undefined;
    onClose = undefined;
  }

  if (_.isPlainObject(title)) {
    options = title;
    title = undefined;
    description = undefined;
    duration = undefined;
    onClose = undefined;
  }

  if (_.isFunction(duration)) {
    onClose = duration;
    duration = undefined;
  }

  if (_.isNumber(description)) {
    duration = description;
    description = undefined;
  }

  if (title !== undefined) options.title = title;
  if (description !== undefined) options.description = description;
  if (duration !== undefined) options.duration = duration;
  if (onClose !== undefined) options.onClose = onClose;

  return options;
}

function decoratorTitle(options, decorator) {
  if (!options.title || !decorator) return options;
  if (_.isArray(options.title)) options.title.unshift(decorator);
  else options.title = [decorator, options.title];

  return options;
}

function createNotificationInstance(config) {
  const placement = _.camelCase(config.placement || DEFAULT_PLACEMENT);

  if (notificationStore[placement]) return notificationStore[placement];

  const wrapper = new Vue({
    render() {
      const { style, className } = getPlacementStyle(config);
      const notificationData = {
        class: [addPrefix('notify'), className],
        style,
        props: { classPrefix: CLASS_PREFIX },
        on: {
          empty: () =>
            (DEFAULT_REMOVE_ON_EMPTY &&
              notificationStore[placement] &&
              notificationStore[placement].destroy()) ||
            (notificationStore[placement] = null),
        },
      };

      return <Notification {...notificationData} />;
    },
  });
  const component = wrapper.$mount();

  document.body.appendChild(component.$el);

  const notification = wrapper.$children[0];

  notificationStore[placement] = {
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

  return notificationStore[placement];
}

function notice(config) {
  config = config || {};

  let instance = createNotificationInstance(config);
  let key = null;

  const content = function(h) {
    let title = renderX(h, config.title);
    let description = renderX(h, config.description);

    return (
      <div class={addPrefix('content')}>
        {title && <div class={addPrefix('title')}>{title}</div>}
        {description && (
          <div class={addPrefix('description')}>{description}</div>
        )}
      </div>
    );
  };

  key = instance.notice(
    _.merge({ duration: DEFAULT_DURATION }, { content, ...config })
  );

  return { remove: () => instance.remove(key) };
}

export default {
  open(...args) {
    return notice(getOptions(...args));
  },

  loading(...args) {
    const options = getOptions(...args);
    const loadingClassName = `${CLASS_PREFIX}-loading`;

    if (_.isArray(options.className)) {
      options.className.unshift(loadingClassName);
    }

    if (options.className) {
      options.className = [options.className, loadingClassName];
    }

    if (!options.className) {
      options.className = loadingClassName;
    }

    return notice(
      decoratorTitle(options, h => (
        <Loader size="sm" style={{ marginRight: '16px' }} />
      ))
    );
  },

  success(...args) {
    const type = NOTIFICATION_TYPES.SUCCESS;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  warning(...args) {
    const type = NOTIFICATION_TYPES.WARNING;
    const options = getOptions(...args);

    options.type = type;

    return notice(decoratorTitle(options, h => <Icon icon={type} />));
  },

  warn(...args) {
    const type = NOTIFICATION_TYPES.WARNING;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  error(...args) {
    const type = NOTIFICATION_TYPES.ERROR;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  info(...args) {
    const type = NOTIFICATION_TYPES.INFO;
    const options = getOptions(...args);

    options.type = type;

    return notice(
      decoratorTitle(options, h => <Icon icon={STATUS_ICON_NAMES[type]} />)
    );
  },

  remove(key, placement) {
    if (placement) {
      placement = _.camelCase(placement || '');
    }

    if (notificationStore[placement]) {
      notificationStore[placement].remove(key);

      return;
    }

    Object.keys(notificationStore).map(placement => {
      notificationStore[placement] && notificationStore[placement].remove(key);
    });
  },

  config(options, remove = true) {
    remove &&
      Object.keys(notificationStore).map(placement => {
        notificationStore[placement] && notificationStore[placement].destroy();
        notificationStore[placement] = null;
      });

    if (options.top !== undefined) {
      DEFAULT_TOP = options.top;
    }

    if (options.right !== undefined) {
      DEFAULT_RIGHT = options.right;
    }

    if (options.bottom !== undefined) {
      DEFAULT_BOTTOM = options.bottom;
    }

    if (options.left !== undefined) {
      DEFAULT_LEFT = options.left;
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
    if (placement && notificationStore[placement]) {
      notificationStore[placement].destroy();
      notificationStore[placement] = null;

      return;
    }

    Object.keys(notificationStore).map(placement => {
      notificationStore[placement] && notificationStore[placement].destroy();
      notificationStore[placement] = null;
    });
  },
};
