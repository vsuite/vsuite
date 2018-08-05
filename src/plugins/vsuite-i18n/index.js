import { t, setLang, config } from './i18n';

export default {
  install(Vue, options) {
    config(options);

    Vue.prototype.$t = t;
    Vue.prototype.$setLang = setLang;
  },
};
