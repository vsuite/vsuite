require('jsdom-global')();

// fix: https://github.com/vuejs/vue/issues/9698
global.performance = window.performance;
