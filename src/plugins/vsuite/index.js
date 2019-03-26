import Button from 'components/Button';
import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';
import Popover from 'components/Popover';
import Alert from 'components/Alert';
import Notification from 'components/Notification';

// import { Fade, Collapse } from 'components/Animation';
// import Divider from 'components/Divider';
// import Loader from 'components/Loader';
// import Pagination from 'components/Pagination';
// import Panel from 'components/Panel';
// import SafeAnchor from 'components/SafeAnchor';
// import Steps from 'components/Steps';
// import Tag from 'components/Tag';
// import Timeline from 'components/Timeline';
// import Modal from 'components/Modal';
// import Alert from 'components/Alert';
// import LoadingBar from 'components/LoadingBar';
// import Notification from 'components/Notification';

export const components = {
  Button,
  Icon,
  Tooltip,
  Popover,

  // Divider,
  // Loader,
  // Modal,
  // Pagination,
  // Panel,
  // SafeAnchor,
  // Steps,
  // Tag,
  // Timeline,
  // Fade,
  // Collapse,
};

export default {
  install(Vue, options) {
    options = Object.assign({ transfer: false }, options || {});

    // register component
    Object.keys(components).forEach(key => components[key].install(Vue));

    // global configuration
    Vue.prototype.$VSUITE = {
      transfer: options.transfer,
    };

    // vsuite injected instance methods
    // Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Alert = Alert;
    Vue.prototype.$Notification = Notification;
    Vue.prototype.$Notice = Notification;
    // Vue.prototype.$Modal = Modal;
  },
};
