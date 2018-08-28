import VueTypes from 'vue-types';
import _ from 'lodash';
import Velocity from 'velocity-animate';

export default {
  name: 'Collapse',

  props: {
    direction: VueTypes.oneOf(['height', 'width']).def('height'),
  },

  render() {
    return (
      <transition
        {...this.$attrs}
        css={false}
        onBeforeEnter={this._handleEnter}
        onEnter={this._handleEntering}
        onLeave={this._handleExiting}
      >
        {this.$slots.default}
      </transition>
    );
  },

  methods: {
    _handleEnter(el) {
      el.style[this.direction] = 0;
      el.style.overflow = 'hidden';
    },

    _handleEntering(el, done) {
      Velocity(
        el,
        { height: _.get(el, _.camelCase(`scroll-${this.direction}`)) },
        { duration: 350, easing: 'ease-in-out', complete: done }
      );
    },

    _handleExiting(el, done) {
      Velocity(
        el,
        { height: 0 },
        { duration: 350, easing: 'ease-in-out', complete: done }
      );
    },
  },
};
