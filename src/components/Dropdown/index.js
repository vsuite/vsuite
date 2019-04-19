import Dropdown from './Dropdown.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import DropdownItem from './DropdownMenuItem.jsx';

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

Dropdown.install = function(Vue) {
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownItem.name, DropdownItem);
};

export default Dropdown;
