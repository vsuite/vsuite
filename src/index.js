import VSuitePlugin, { components } from './plugins/vsuite';
import VSuiteI18nPlugin from './plugins/vsuite-i18n';

function install(Vue, options) {
  Vue.use(VSuitePlugin, options);
  Vue.use(VSuiteI18nPlugin, options);
}

// cdn
if (typeof window === 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  VERSION: process.env.VERSION,
  install,
  ...components,
};
