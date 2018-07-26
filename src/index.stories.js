import Vue from 'vue';

import vsuite from './index';

import './styles/index.less';

const req = require.context('./components', true, /\.stories\.js$/);

Vue.use(vsuite);

req.keys().forEach(filename => req(filename));
