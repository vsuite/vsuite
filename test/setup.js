import VSuite from '@/index';
import Vue from 'vue';

Vue.use(VSuite);

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

// fix: https://github.com/vuejs/vue/issues/9698
global.performance = window.performance;
