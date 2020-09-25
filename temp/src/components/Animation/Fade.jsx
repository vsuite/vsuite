export default {
  name: 'Fade',

  props: {
    type: {
      type: String,
      default: 'transition',
    },
  },

  render() {
    const data = {
      props: {
        ...(this.type === 'transition'
          ? { appear: true, name: 'fade' }
          : {
              appear: true,
              type: 'animation',
              enterActiveClass: 'fade-in',
              leaveActiveClass: 'fade-out',
            }),
        ...this.$attrs,
      },
      on: this.$listeners,
    };

    return <transition {...data}>{this.$slots.default}</transition>;
  },
};
