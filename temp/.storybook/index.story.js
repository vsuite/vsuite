import Vue from 'vue';
import zhCN from 'langs/zh-CN';

import VSuite from '@/index';

import 'styles/index.less';
import './style.less';

Vue.use(VSuite, {
  // locale: 'zh-CN',
  messages: { 'zh-CN': zhCN },
});

const req = require.context('../src/components', true, /\.story\.js$/);

req.keys().forEach(filename => req(filename));
