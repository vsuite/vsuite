export default {
  name: 'Fade',

  render() {
    const data = {
      props: this.$attrs,
      on: this.$listeners,
    };

    return (
      <transition name="fade" {...data}>
        {this.$slots.default}
      </transition>
    );
  },
};
