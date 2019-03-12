import glob from 'fast-glob';
import mdate from 'mockdate';
import moment from 'moment';
import Vue from 'vue';
import VSuite from '@/index';
import { mount } from '@vue/test-utils';

Vue.use(VSuite);

export default (component, options = {}) => {
  const suffix = options.suffix || 'md';
  const files = glob.sync([
    `./src/components/${component}/doc/*.${suffix}`,
    '!**/index.md',
  ]);

  describe(`${component} demo`, () => {
    files.forEach(file => {
      const name = /([^/.]*?)\.md$/.exec(file)[1];
      let testMethod = options.skip === true ? test.skip : test;

      if (
        Array.isArray(options.skip) &&
        options.skip.some(c => new RegExp(`${c}\\.md$`).test(file))
      ) {
        testMethod = test.skip;
      }

      testMethod(`renders ${name} demo correctly`, done => {
        mdate.set(moment('2000-12-31'));

        const demo = require(`../.${file}`).default || require(`../.${file}`);
        const wrapper = mount(demo, { sync: false });

        Vue.nextTick(() => {
          expect(wrapper.html()).toMatchSnapshot();

          wrapper.destroy();

          mdate.reset();

          done();
        });
      });
    });
  });
};
