import Button from '../../components/Button';

export const components = { Button };
export default {
  install(Vue, options) {
    Vue.component('Button', Button);
  },
};
