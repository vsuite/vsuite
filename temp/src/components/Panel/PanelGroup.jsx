import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getName, getKey, getProps, cloneElement } from 'utils/node';

const CLASS_PREFIX = 'panel-group';

export default {
  name: 'PanelGroup',

  props: {
    activeKey: VueTypes.any,
    defaultActiveKey: VueTypes.any,
    accordion: VueTypes.bool.def(false),
    bordered: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      vActiveKey: this.defaultActiveKey,
    };
  },

  computed: {
    isActiveKey() {
      return _.isUndefined(this.activeKey) ? this.vActiveKey : this.activeKey;
    },

    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('accordion')]: this.accordion,
          [this._addPrefix('bordered')]: this.bordered,
        },
      ];
    },
  },

  render() {
    let children = this.$slots.default || [];

    children = children.map((vnode, index) => {
      const name = getName(vnode);

      if (name !== 'Panel') return vnode;

      const data = {
        key: getKey(vnode) ? getKey(vnode) : index,
      };
      const childProps = getProps(vnode);

      if (this.accordion) {
        data.props = {
          headerRole: 'tab',
          panelRole: 'tabpanel',
          collapsible: true,
          expanded: _.isUndefined(this.isActiveKey)
            ? childProps.expanded
            : childProps.eventKey === this.isActiveKey,
        };
        data.on = {
          select: this._handleSelect,
        };
      }

      return cloneElement(vnode, data);
    });

    return (
      <div class={this.classes} role={this.accordion ? 'tablist' : undefined}>
        {children}
      </div>
    );
  },

  methods: {
    _handleSelect(eventKey, event) {
      this.vActiveKey = eventKey;

      this.$emit('select', eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
