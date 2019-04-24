import Nav from './Nav.jsx';
import NavItem from './NavItem.jsx';

Nav.Item = NavItem;

Nav.install = function(Vue) {
  Vue.component(Nav.name, Nav);
  Vue.component(NavItem.name, NavItem);
};

export default Nav;
