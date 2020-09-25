import Drawer from './Drawer.jsx';
import DrawerInstance from './instance';

Drawer.open = DrawerInstance.open;
Drawer.confirm = DrawerInstance.confirm;
Drawer.success = DrawerInstance.success;
Drawer.warning = DrawerInstance.warning;
Drawer.warn = DrawerInstance.warning;
Drawer.error = DrawerInstance.error;
Drawer.info = DrawerInstance.info;
Drawer.remove = DrawerInstance.remove;

Drawer.install = function(Vue) {
  Vue.component(Drawer.name, Drawer);
};

export default Drawer;
