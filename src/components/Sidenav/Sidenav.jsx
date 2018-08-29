import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shallowEqual from 'utils/shallowEqual';
import { splitDataByComponent } from 'utils/split';
import { addClass, removeClass } from 'shares/dom';

const CLASS_PREFIX = 'sidenav';

export default {
  name: 'Sidenav',

  provide() {
    return {
      $vSidenav: this,
    };
  },

  props: {
    expanded: VueTypes.bool,
    appearance: VueTypes.oneOf(['default', 'inverse', 'subtle']).def('default'),
    openKeys: VueTypes.arrayOf(VueTypes.any),
    defaultOpenKeys: VueTypes.arrayOf(VueTypes.any),
    activeKey: VueTypes.any,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  data() {
    return {
      innerOpenKeys: _.isUndefined(this.openKeys)
        ? this.defaultOpenKeys
        : this.openKeys,
    };
  },

  computed: {
    classes() {
      return [this.classPrefix, this._addPrefix(this.appearance)];
    },

    currentOpenKeys() {
      return _.isUndefined(this.openKeys) ? this.innerOpenKeys : this.openKeys;
    },
  },

  render() {
    const Component = this.componentClass;
    const data = splitDataByComponent(
      {
        class: this.classes,
        directives: [{ name: 'show', value: this.expanded }],
        splitProps: {
          ...this.$attrs,
          role: 'navigation',
        },
        ref: 'sidenav',
      },
      Component
    );

    return (
      <transition
        appear
        onBeforeEnter={this._handleEnter}
        onEnter={this._handleEntering}
        onAfterEnter={this._handleEntered}
        onBeforeLeave={this._handleExit}
        onLeave={this._handleExiting}
        onAfterLeave={this._handleExited}
      >
        <Component {...data}>{this.$slots.default}</Component>
      </transition>
    );
  },

  methods: {
    _handleEnter(el) {
      removeClass(el, this._addPrefix('collapse-out'));
    },

    _handleEntering(el) {
      addClass(el, this._addPrefix(['collapse-in', 'collapsing']));
    },

    _handleEntered(el) {
      removeClass(el, this._addPrefix('collapsing'));
    },

    _handleExit(el) {
      removeClass(el, this._addPrefix('collapse-in'));
    },

    _handleExiting(el) {
      addClass(el, this._addPrefix(['collapse-out', 'collapsing']));
    },

    _handleExited(el) {
      removeClass(el, this._addPrefix('collapsing'));

      el.style.display = 'block';
    },

    _handleSelect(eventKey, event) {
      this.$emit('select', eventKey, event);
    },

    _handleOpenChange(eventKey, event) {
      const find = key => shallowEqual(key, eventKey);
      let openKeys = _.clone(this.currentOpenKeys) || [];
      let innerOpenKeys = _.clone(this.innerOpenKeys) || [];
      let index = _.findIndex(openKeys, find);
      let innerIndex = _.findIndex(innerOpenKeys, find);

      if (index === -1) {
        openKeys.push(eventKey);
      } else {
        openKeys.splice(index, 1);
      }

      if (innerIndex === -1) {
        this.innerOpenKeys.push(eventKey);
      } else {
        this.innerOpenKeys.splice(innerIndex, 1);
      }

      this.$emit('open-change', openKeys, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
