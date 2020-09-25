import InputGroup from './InputGroup.jsx';
import InputGroupAddon from './InputGroupAddon.jsx';
import InputGroupButton from './InputGroupButton.jsx';

InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;

InputGroup.install = function(Vue) {
  Vue.component(InputGroup.name, InputGroup);
  Vue.component(InputGroupAddon.name, InputGroupAddon);
  Vue.component(InputGroupButton.name, InputGroupButton);
};

export default InputGroup;
