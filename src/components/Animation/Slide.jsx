import VueTypes from 'vue-types';

export default {
  name: 'Slide',

  props: {
    placement: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('right'),
  },

  render() {
    const data = {
      props: this.$attrs,
      on: this.$listeners,
    };

    return (
      <transition
        appear
        enterActiveClass={`slide-in ${this.placement}`}
        leaveActiveClass={`slide-out ${this.placement}`}
        {...data}
      >
        {this.$slots.default}
      </transition>
    );
  },
};
