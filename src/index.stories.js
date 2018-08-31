import Vue from 'vue';
import TreeView from 'vue-json-tree-view';
import zhCN from 'langs/zh_CN';

import VSuite from './index';

import './styles/index.less';

Vue.use(VSuite, {
  // locale: 'zh_CN',
  messages: { zh_CN: zhCN },
});
Vue.use(TreeView);

const req = require.context('./components', true, /\.stories\.js$/);

req.keys().forEach(filename => req(filename));
