import Vue from 'vue';
import VSuite from '@/index';
import { TransitionStub, TransitionGroupStub } from '@vue/test-utils';

Vue.use(VSuite);
Vue.component('transition', TransitionStub);
Vue.component('transition-group', TransitionGroupStub);

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
