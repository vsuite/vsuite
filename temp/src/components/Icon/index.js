import Icon from './Icon.jsx';
import IconStack from './IconStack.jsx';

Icon.Stack = IconStack;

Icon.install = function(Vue) {
  Vue.component(Icon.name, Icon);
  Vue.component(IconStack.name, IconStack);
};

export default Icon;
