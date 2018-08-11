import { Fade, Collapse } from 'components/Animation';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import ButtonGroup from 'components/ButtonGroup';
import ButtonToolbar from 'components/ButtonToolbar';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import IconStack from 'components/IconStack';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import Panel from 'components/Panel';
import PanelGroup from 'components/PanelGroup';
import ProgressCircle from 'components/ProgressCircle';
import ProgressLine from 'components/ProgressLine';
import SafeAnchor from 'components/SafeAnchor';
import Steps from 'components/Steps';
import StepItem from 'components/StepItem';
import Tag from 'components/Tag';
import Timeline from 'components/Timeline';
import TimelineItem from 'components/TimelineItem';

import Alert from 'components/Alert';
import LoadingBar from 'components/LoadingBar';
import Notification from 'components/Notification';

export const components = {
  Button,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
  Divider,
  Icon,
  IconStack,
  Loader,
  Pagination,
  Panel,
  PanelGroup,
  ProgressCircle,
  ProgressLine,
  SafeAnchor,
  Steps,
  StepItem,
  Tag,
  Timeline,
  TimelineItem,
  Fade,
  Collapse,
};
export default {
  install(Vue, options) {
    options = Object.assign({ transfer: false }, options || {});

    // register component
    Object.keys(components).forEach(key => Vue.component(key, components[key]));

    // global configuration
    Vue.prototype.$VSUITE = {
      transfer: options.transfer,
    };

    // vsuite injected instance methods
    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Alert = Alert;
    Vue.prototype.$Notification = Notification;
    Vue.prototype.$Notice = Notification;
  },
};
