import { configure, addParameters } from '@storybook/vue';

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\/|\./,
  },
});

function loadStories() {
  require('./index.stories');
}

configure(loadStories, module);
