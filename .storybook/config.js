import { configure, addParameters } from '@storybook/vue';
// import { themes } from '@storybook/theming';

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\/|\./,
    // theme: themes.dark,
  },
});

function loadStories() {
  require('./index.story');
}

configure(loadStories, module);
