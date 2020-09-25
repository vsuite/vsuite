import ProgressLine from './ProgressLine.jsx';
import ProgressCircle from './ProgressCircle.jsx';

const Progress = {};

Progress.Line = ProgressLine;
Progress.Circle = ProgressCircle;

Progress.install = function(Vue) {
  Vue.component(ProgressLine.name, ProgressLine);
  Vue.component(ProgressCircle.name, ProgressCircle);
};

export default Progress;
