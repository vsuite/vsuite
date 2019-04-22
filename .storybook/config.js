import { configure, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';

// FIXME: custom sort methods
//  https://github.com/storybooks/storybook/issues/5827
addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\/|\./,
    theme: themes.normal,
  },
});

function loadStories() {
  require('./index.story');
}

configure(loadStories, module);
