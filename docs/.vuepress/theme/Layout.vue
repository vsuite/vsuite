<template>
  <component :is="layout"><Content /></component>
</template>

<script>
import Home from './layouts/Home.vue';

export default {
  components: { Home },

  computed: {
    layout() {
      return (
        (this.$page.frontmatter && this.$page.frontmatter.layout) || 'home'
      );
    },
  },
};
</script>
