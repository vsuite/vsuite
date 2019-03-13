import Button from './Button.jsx';
import ButtonGroup from './ButtonGroup.jsx';
import ButtonToolbar from './ButtonToolbar.jsx';
import IconButton from './IconButton.jsx';

Button.Icon = IconButton;
Button.Group = ButtonGroup;
Button.Toolbar = ButtonToolbar;

Button.install = function(Vue) {
  Vue.component(Button.name, Button);
  Vue.component(ButtonGroup.name, ButtonGroup);
  Vue.component(ButtonToolbar.name, ButtonToolbar);
};

export default Button;
