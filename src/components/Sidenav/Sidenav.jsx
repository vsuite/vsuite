import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shallowEqual from 'utils/shallowEqual';
import { splitDataByComponent } from 'utils/split';
import { addClass } from 'shares/dom';

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
    // select, openChange
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
        type="animation"
        enterActiveClass={this._addPrefix(['collapse-in', 'collapsing']).join(
          ' '
        )}
        enterToClass={this._addPrefix('collapse-in')}
        leaveActiveClass={this._addPrefix(['collapse-out', 'collapsing']).join(
          ' '
        )}
        leaveToClass={this._addPrefix('collapse-out')}
        onAfterEnter={this._handleAfterEnter}
        onAfterLeave={this._handleAfterLeave}
      >
        <Component {...data}>{this.$slots.default}</Component>
      </transition>
    );
  },

  methods: {
    _handleAfterEnter() {
      const sidenav = this.$refs.sidenav || this.$refs.sidenav.$el;

      if (!sidenav) return;

      addClass(sidenav, this._addPrefix('collapse-in'));
    },

    _handleAfterLeave() {
      const sidenav = this.$refs.sidenav || this.$refs.sidenav.$el;

      if (!sidenav) return;

      addClass(sidenav, this._addPrefix('collapse-out'));
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
