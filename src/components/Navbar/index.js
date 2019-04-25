import Navbar from './Navbar.jsx';
import NavbarHeader from './NavbarHeader.jsx';
import NavbarBody from './NavbarBody.jsx';

Navbar.Header = NavbarHeader;
Navbar.Body = NavbarBody;

Navbar.install = function(Vue) {
  Vue.component(Navbar.name, Navbar);
  Vue.component(NavbarHeader.name, NavbarHeader);
  Vue.component(NavbarBody.name, NavbarBody);
};

export default Navbar;
