import Vue from 'vue';
import JsonPretty from 'vue-json-pretty';
import Content, { Paragraph } from 'stories/content';
import VSuite from '@/index';
import { TransitionStub, TransitionGroupStub } from '@vue/test-utils';

Vue.use(VSuite);
Vue.component(Content.name, Content);
Vue.component(Paragraph.name, Paragraph);
Vue.component('json-pretty', JsonPretty);
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
