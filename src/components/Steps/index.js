import Steps from './Steps.jsx';
import StepItem from './StepItem.jsx';
import STATUS from './status';

Steps.Item = StepItem;
Steps.STATUS = STATUS;

Steps.install = function(Vue) {
  Vue.component(Steps.name, Steps);
  Vue.component(StepItem.name, StepItem);
};

export default Steps;
