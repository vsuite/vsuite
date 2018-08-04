import VueTypes from 'vue-types';
import _ from 'lodash';
import { addStyle, addClass, removeClass } from 'shares/dom';

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
        onBeforeEnter={this._handleEnter}
        onEnter={this._handleEntering}
        onAfterEnter={this._handleEntered}
        onEnterCancelled={this._handleEnterFailed}
        onBeforeLeave={this._handleExit}
        onLeave={this._handleExiting}
        onAfterLeave={this._handleExited}
        onLeaveCancelled={this._handleExitFailed}
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

    /* eslint-disable */
    _handleEnter(el) {
      const dimension = this._dimension();

      addClass(el, 'collapse');
      addStyle(el, dimension, '0px');
    },

    _handleEntering(el, done) {
      const dimension = this._dimension();

      removeClass(el, 'collapse');
      addClass(el, 'collapsing');

      this.$nextTick(() => {
        addStyle(
          el,
          dimension,
          _.get(el, `scroll${_.capitalize(dimension)}`) + 'px'
        );
        setTimeout(done, 350);
      });
    },

    _handleEntered(el) {
      const dimension = this._dimension();

      removeClass(el, 'collapsing');
      addClass(el, 'collapse');
      addClass(el, 'in');
      addStyle(el, dimension, 'auto');
    },

    _handleEnterFailed(el) {
      const dimension = this._dimension();

      removeClass(el, 'collapsing');
      removeClass(el, 'in');
      addClass(el, 'collapse');
      addStyle(el, dimension, '0px');
    },

    _handleExit(el) {
      const dimension = this._dimension();

      addClass(el, 'collapse');
      addClass(el, 'in');
      addStyle(
        el,
        dimension,
        _.get(el, `offset${_.capitalize(dimension)}`) + 'px'
      );
    },

    _handleExiting(el, done) {
      const dimension = this._dimension();

      removeClass(el, 'collapse');
      removeClass(el, 'in');
      addClass(el, 'collapsing');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          addStyle(el, dimension, '0px');

          setTimeout(done, 350);
        });
      });
    },

    _handleExited(el) {},

    _handleExitFailed(el) {
      const dimension = this._dimension();

      removeClass(el, 'collapsing');
      addClass(el, 'collapse');
      addClass(el, 'in');
      addStyle(el, dimension, 'auto');
    },
  },
};
