import Vue from 'vue';
import TreeView from 'vue-json-tree-view';

import VSuite from './index';

import './styles/index.less';

Vue.use(VSuite);
Vue.use(TreeView);

const req = require.context('./components', true, /\.stories\.js$/);

req.keys().forEach(filename => req(filename));
