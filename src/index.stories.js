import Vue from 'vue';
import VSuite from './index';

import './styles/index.less';

Vue.use(VSuite);

const req = require.context('./components', true, /\.stories\.js$/);

req.keys().forEach(filename => req(filename));
