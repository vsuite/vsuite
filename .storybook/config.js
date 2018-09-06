import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

setOptions({
  hierarchyRootSeparator: /\|/,
  hierarchySeparator: /\./,
});

function loadStories() {
  require('./index.stories');
}

configure(loadStories, module);
