import Radio from './Radio.jsx';
import RadioGroup from './RadioGroup.jsx';

Radio.Group = RadioGroup;

Radio.install = function(Vue) {
  Vue.component(Radio.name, Radio);
  Vue.component(RadioGroup.name, RadioGroup);
};

export default Radio;
