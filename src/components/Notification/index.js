import Vue from 'vue';
import Icon from 'components/Icon';
import _ from 'lodash';
import renderX from 'utils/render';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { STATUS_ICON_NAMES } from 'utils/constant';

import Notification from './Notification.jsx';

const PLACEMENT_TYPES = {
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
};
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};
const CLASS_PREFIX = defaultClassPrefix('notification');

let DEFAULT_PLACEMENT = 'topRight';
let DEFAULT_TOP = 24;
let DEFAULT_BOTTOM = 24;
let DEFAULT_DURATION = 4500;
let notificationStore = {};

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

  if (placement === PLACEMENT_TYPES.TOP_LEFT) {
    style = {
      top: formatStyleVal(top),
      left: '24px',
    };
    className = addPrefix('top-left');
  } else if (placement === PLACEMENT_TYPES.TOP_RIGHT) {
    style = {
      top: formatStyleVal(top),
      right: '24px',
    };
    className = addPrefix('top-right');
  } else if (placement === PLACEMENT_TYPES.BOTTOM_LEFT) {
    style = {
      bottom: formatStyleVal(bottom),
      left: '24px',
    };
    className = addPrefix('bottom-left');
  } else if (placement === PLACEMENT_TYPES.BOTTOM_RIGHT) {
    style = {
      bottom: formatStyleVal(bottom),
      right: '24px',
    };
    className = addPrefix('bottom-right');
  } else {
    style = {
      top: formatStyleVal(top),
      left: '24px',
    };
  }

  return { style, className };
}

function createNotificationInstance(config) {
  const placement = _.camelCase(config.placement || DEFAULT_PLACEMENT);

  if (notificationStore[placement]) return notificationStore[placement];

  const wrapper = new Vue({
    render: h => {
      const { style, className } = getPlacementStyle(config);
      const notificationData = {
        class: [addPrefix('notify'), className],
        style,
        props: {
          classPrefix: CLASS_PREFIX,
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
      notification.add(data || {});
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
  let duration;

  if (config.duration === undefined) {
    duration = DEFAULT_DURATION;
  } else {
    duration = config.duration;
  }

  const content = function(h) {
    let title = renderX(h, config.title);
    let description = renderX(h, config.description);

    return (
      <div class={addPrefix('content')}>
        <div class={addPrefix('title')}>
          {config.type && <Icon icon={STATUS_ICON_NAMES[config.type]} />}
          {title}
        </div>
        <div class={addPrefix('description')}>{description}</div>
      </div>
    );
  };

  instance.notice({
    content,
    duration,
    closable: true,
    onClose: config.onClose,
    key: config.key,
    type: config.type,
    ...config,
  });
}

export default {
  open(config) {
    notice(config);
  },

  success(config) {
    config.type = NOTIFICATION_TYPES.SUCCESS;

    notice(config);
  },

  error(config) {
    config.type = NOTIFICATION_TYPES.ERROR;

    notice(config);
  },

  info(config) {
    config.type = NOTIFICATION_TYPES.INFO;

    notice(config);
  },

  warning(config) {
    config.type = NOTIFICATION_TYPES.WARNING;

    notice(config);
  },

  warn(config) {
    config.type = NOTIFICATION_TYPES.WARNING;

    notice(config);
  },

  remove(key, placement) {
    if (placement) {
      placement = _.camelCase(placement || DEFAULT_PLACEMENT);
    }

    if (notificationStore[placement]) {
      notificationStore[placement].remove(key);
    }
  },

  config(options) {
    if (options.top !== undefined) {
      DEFAULT_TOP = options.top;
    }

    if (options.bottom !== undefined) {
      DEFAULT_BOTTOM = options.bottom;
    }

    if (options.duration !== undefined) {
      DEFAULT_DURATION = options.duration;
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
