// General
import Button from 'components/Button';
import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';
import Popover from 'components/Popover';
import Message from 'components/Message';
import Loader from 'components/Loader';
import Divider from 'components/Divider';
import Progress from 'components/Progress';

// Navigation
import Dropdown from 'components/Dropdown';
import Nav from 'components/Nav';
import Navbar from 'components/Navbar';
import Sidenav from 'components/Sidenav';
import Steps from 'components/Steps';
import Breadcrumb from 'components/Breadcrumb';
import Pagination from 'components/Pagination';

// Data Entry
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import InputNumber from 'components/InputNumber';
import AutoComplete from 'components/AutoComplete';
import Toggle from 'components/Toggle';
import InputPicker from 'components/InputPicker';
import TagPicker from 'components/TagPicker';
import SelectPicker from 'components/SelectPicker';
import CheckPicker from 'components/CheckPicker';
import TreePicker from 'components/TreePicker';
import CheckTreePicker from 'components/CheckTreePicker';

// Data Display
import Tag from 'components/Tag';

// Layout
import Grid from 'components/Grid';

// Modal
import Alert from 'components/Alert';
import Notification from 'components/Notification';
import LoadingBar from 'components/LoadingBar';
import Modal from 'components/Modal';
import Drawer from 'components/Drawer';

// Utils
import Animation from 'components/Animation';

// import { Fade, Collapse } from 'components/Animation';
// import Pagination from 'components/Pagination';
// import Panel from 'components/Panel';
// import SafeAnchor from 'components/SafeAnchor';
// import Steps from 'components/Steps';
// import Tag from 'components/Tag';
// import Timeline from 'components/Timeline';
// import Alert from 'components/Alert';
// import LoadingBar from 'components/LoadingBar';
// import Notification from 'components/Notification';

export const components = {
  Button,
  Icon,
  Tooltip,
  Popover,
  Message,
  Loader,
  Divider,
  Progress,

  Modal,
  Drawer,

  Dropdown,
  Nav,
  Navbar,
  Sidenav,
  Steps,
  Breadcrumb,
  Pagination,

  Checkbox,
  Radio,
  Input,
  InputGroup,
  InputNumber,
  AutoComplete,
  Toggle,
  InputPicker,
  TagPicker,
  SelectPicker,
  CheckPicker,
  TreePicker,
  CheckTreePicker,

  Tag,

  Grid,

  Animation,

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
    // loading-bar
    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$LoadingBar = LoadingBar;
    // alert
    Vue.prototype.$Alert = Alert;
    // notification
    Vue.prototype.$Notification = Notification;
    Vue.prototype.$Notice = Notification;
    // modal
    Vue.prototype.$Modal = Modal;
    // drawer
    Vue.prototype.$Drawer = Drawer;
  },
};
