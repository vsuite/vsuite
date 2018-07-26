<template>
  <a
    :href="href"
    :disabled="disabled"
    @click="_onClick"
  >
    <slot/>
  </a>
</template>

<script>
export default {
  props: {
    href: String,
    disabled: Boolean,
  },

  data() {
    return {};
  },

  methods: {
    _onClick(event) {
      if (this.disabled || !this.href || this.href.trim() === '#') {
        event.preventDefault();
      }

      if (!this.disabled) {
        return event.stopPropagation();
      }

      this.$emit('click');
    },
  },
};
</script>
