import Navbar from './Navbar.jsx';

Navbar.install = function(Vue) {
  Vue.component(Navbar.name, Navbar);
};

export default Navbar;
