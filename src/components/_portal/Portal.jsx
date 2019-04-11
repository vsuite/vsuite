import Vue from 'vue';
import VueTypes from 'vue-types';
import { getContainer } from 'dom-lib';

export default {
  name: 'Portal',

  props: {
    container: VueTypes.any,
  },

  mounted() {
    const $container = getContainer(this.container, document.body);
    const $portal = document.createElement('div');
    const $children = this.$slots.default;

    $container.appendChild($portal);

    const $portalVM = new Vue({
      name: this.componentName,
      abstract: true,
      parent: this,
      render() {
        return <div>{$children}</div>;
      },
    });

    $portalVM.$mount($portal);

    this.$portal = $portalVM.$el;
  },

  beforeDestroy() {},

  render() {
    return null;
  },
};
