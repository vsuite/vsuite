import Vue from 'vue';
import zhCN from 'langs/zh_CN';

import VSuite from '@/index';

import 'styles/index.less';
import './style.less';

Vue.use(VSuite, {
  // locale: 'zh_CN',
  messages: { zh_CN: zhCN },
});

const req = require.context('../src/components', true, /\.story\.js$/);

req.keys().forEach(filename => req(filename));
