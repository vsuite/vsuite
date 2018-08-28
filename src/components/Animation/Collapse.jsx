import VueTypes from 'vue-types';
import _ from 'lodash';
import { addStyle } from 'shares/dom';

export default {
  name: 'Collapse',

  props: {
    dimension: VueTypes.oneOfType([VueTypes.string, VueTypes.func]).def(
      'height'
    ),
  },

  render() {
    return (
      <transition
        {...this.$attrs}
        type="transition"
        enterClass="collapse"
        enterActiveClass="collapsing"
        enterToClass="collapse in"
        leaveClass="collapse in"
        leaveActiveClass="collapsing"
        leaveToClass="collapse"
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
    _dimension() {
      return typeof this.dimension === 'function'
        ? this.dimension()
        : this.dimension;
    },

    _handleEnter(el) {
      const dimension = this._dimension();

      addStyle(el, dimension, '0px');
    },

    _handleEntering(el) {
      const dimension = this._dimension();

      requestAnimationFrame(() => {
        addStyle(
          el,
          dimension,
          _.get(el, `scroll${_.capitalize(dimension)}`) + 'px'
        );
      });
    },

    _handleEntered(el) {
      const dimension = this._dimension();

      addStyle(el, dimension, 'auto');
    },

    _handleExit(el) {
      const dimension = this._dimension();

      addStyle(
        el,
        dimension,
        _.get(el, `scroll${_.capitalize(dimension)}`) + 'px'
      );
    },

    _handleExiting(el) {
      const dimension = this._dimension();

      requestAnimationFrame(() => {
        addStyle(el, dimension, '0px');
      });
    },

    _handleExited(el) {},
  },
};
