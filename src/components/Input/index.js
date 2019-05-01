import Input from './Input.jsx';
import InputGroup from '../InputGroup';

Input.Group = InputGroup;

Input.install = function(Vue) {
  Vue.component(Input.name, Input);

  InputGroup.install(Vue);
};

export default Input;
