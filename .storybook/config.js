import { addDecorator, configure } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\./,
  })
);

function loadStories() {
  require('./index.stories');
}

configure(loadStories, module);
