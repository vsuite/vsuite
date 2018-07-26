import { configure } from '@storybook/vue';

function loadStories() {
  require('../src/index.stories');
}

configure(loadStories, module);
