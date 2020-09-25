import Checkbox from './Checkbox.jsx';
import CheckboxGroup from './CheckboxGroup.jsx';

Checkbox.Group = CheckboxGroup;

Checkbox.install = function(Vue) {
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export default Checkbox;
