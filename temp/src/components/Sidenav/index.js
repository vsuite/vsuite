import Sidenav from './Sidenav.jsx';
import SidenavHeader from './SidenavHeader.jsx';
import SidenavBody from './SidenavBody.jsx';
import SidenavToggle from './SidenavToggle.jsx';

Sidenav.Header = SidenavHeader;
Sidenav.Body = SidenavBody;
Sidenav.Toggle = SidenavToggle;

Sidenav.install = function(Vue) {
  Vue.component(Sidenav.name, Sidenav);
  Vue.component(SidenavHeader.name, SidenavHeader);
  Vue.component(SidenavBody.name, SidenavBody);
  Vue.component(SidenavToggle.name, SidenavToggle);
};

export default Sidenav;
