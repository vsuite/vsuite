import VueTypes from 'vue-types';
import _ from 'lodash';
import { addClass, removeClass } from 'shares/dom';

export default {
  name: 'Collapse',

  props: {
    direction: VueTypes.oneOf(['height', 'width']).def('height'),
  },

  render() {
    return (
      <transition
        {...this.$attrs}
        onBeforeEnter={this._handleEnter}
        onEnter={this._handleEntering}
        onAfterEnter={this._handleEntered}
        onBeforeLeave={this._handleExit}
        onLeave={this._handleExiting}
        onAfterLeave={this._handleExited}
      >
        {this.$slots.default}
      </transition>
    );
  },

  methods: {
    _handleEnter(el) {
      el.style[this.direction] = '0';
    },

    _handleEntering(el) {
      const val = _.get(el, _.camelCase(`scroll-${this.direction}`));

      if (val) {
        addClass(el, 'collapsing');

        el.style[this.direction] = `${val}px`;
      }
    },

    _handleEntered(el) {
      removeClass(el, 'collapsing');

      el.style[this.direction] = 'auto';
    },

    _handleExit(el) {
      const val = _.get(el, _.camelCase(`scroll-${this.direction}`));

      if (val) {
        el.style[this.direction] = `${val}px`;
      }
    },

    _handleExiting(el) {
      const val = _.get(el, _.camelCase(`scroll-${this.direction}`));

      if (val) {
        addClass(el, 'collapsing');

        el.style[this.direction] = '0px';
      }
    },

    _handleExited(el) {
      removeClass(el, 'collapsing');
    },
  },
};
