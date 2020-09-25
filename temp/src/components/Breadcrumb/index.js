import Breadcrumb from './Breadcrumb.jsx';
import BreadcrumbItem from './BreadcrumbItem.jsx';

Breadcrumb.Item = BreadcrumbItem;

Breadcrumb.install = function(Vue) {
  Vue.component(Breadcrumb.name, Breadcrumb);
  Vue.component(BreadcrumbItem.name, BreadcrumbItem);
};

export default Breadcrumb;
