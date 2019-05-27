import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import { mapNode } from 'utils/tree';
import data from 'stories/data/city';

import TreePicker from 'components/TreePicker';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|TreePicker', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <TreePicker style={{ width: '246px' }} data={data} />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <TreePicker
          style={{ width: '246px' }}
          data={data}
          appearance="default"
          placeholder="Default"
        />
        <hr />
        <TreePicker
          style={{ width: '246px' }}
          data={data}
          appearance="subtle"
          placeholder="Subtle"
        />
      </Demo>
    );
  },
}));

stories.add('leaf', () => ({
  render() {
    return (
      <Demo title="Leaf">
        <TreePicker style={{ width: '246px' }} leaf data={data} />
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <TreePicker block data={data} />
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  render(h) {
    return (
      <Demo title="Placement">
        <table id="customTable">
          <tbody>
            <tr>
              <td />
              <td>{this._renderTreePicker(h, 'bottom-start')}</td>
              <td>{this._renderTreePicker(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderTreePicker(h, 'right-start')}</td>
              <td />
              <td />
              <td>{this._renderTreePicker(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderTreePicker(h, 'right-end')}</td>
              <td />
              <td />
              <td>{this._renderTreePicker(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderTreePicker(h, 'top-start')}</td>
              <td>{this._renderTreePicker(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },

  methods: {
    _renderTreePicker(h, placement) {
      return (
        <TreePicker data={data} placement={placement} placeholder={placement} />
      );
    },
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <TreePicker style={{ width: '246px' }} disabled data={data} />
        <hr />
        <p>禁用选项</p>
        <TreePicker
          style={{ width: '246px' }}
          data={data}
          disabledItemValues={[{ id: 2 }]}
        />
      </Demo>
    );
  },
}));

stories.add('searchable', () => ({
  render() {
    return (
      <Demo title="Searchable">
        <TreePicker style={{ width: '246px' }} data={data} searchable={false} />
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <TreePicker
          style={{ width: '246px' }}
          data={data}
          placeholder="选择地区"
          renderTreeNode={(h, nodeData) => {
            return (
              <span>
                <i class="vs-icon vs-icon-map-marker" /> {nodeData.label}
              </span>
            );
          }}
          renderValue={(h, label) => {
            return (
              <span>
                <i class="vs-icon vs-icon-map-marker" /> {label}
              </span>
            );
          }}
        />
      </Demo>
    );
  },
}));

stories.add('async', () => ({
  data() {
    return {
      data: [],
      value: [],
      requestId: 0,
    };
  },

  render() {
    return (
      <Demo title="Async">
        <TreePicker
          style={{ width: '272px' }}
          data={this.data}
          value={this.value}
          onShow={this._handleShow}
          onChange={this._handleChange}
          onToggle={this._handleToggle}
          renderMenu={(h, menu) => {
            if (this.data.length === 0) {
              return (
                <p
                  style={{ padding: '4px', color: '#999', textAlign: 'center' }}
                >
                  <Icon spin icon="spinner" /> 加载中...
                </p>
              );
            }

            return menu;
          }}
          renderTreeIcon={this._renderTreeIcon}
        />
      </Demo>
    );
  },

  methods: {
    _renderTreeIcon(h, data) {
      if (!data.loading) return null;

      return <Icon icon="spinner" spin />;
    },

    _handleChange(value) {
      this.value = value;
    },

    _handleToggle(data) {
      if (data.requestId) {
        this._setLoading(data.requestId);
      }
    },

    _handleShow() {
      if (this.data.length === 0) {
        setTimeout(() => {
          this.data = [
            {
              label: 'Parent Node',
              value: '0',
              children: [],
              requestId: ++this.requestId,
            },
          ];
        }, 1000);
      }
    },

    _setLoading(requestId) {
      const data = _.cloneDeep(this.data);

      this.data = mapNode(data, node => {
        if (node.requestId === requestId) {
          return { ...node, loading: true };
        }

        return node;
      });

      setTimeout(() => {
        const data = _.cloneDeep(this.data);

        this.data = mapNode(data, (node, _, __, children) => {
          if (node.requestId === requestId) {
            const value1 = ++this.requestId;
            const value2 = ++this.requestId;

            children.push({
              label: 'Child Node',
              value: `${value1}`,
              children: [],
              requestId: value1,
            });
            children.push({
              label: 'Child Node',
              value: `${value2}`,
              children: [],
              requestId: value2,
            });

            delete node.loading;
            delete node.requestId;

            return node;
          }

          return node;
        });
      }, 1000);
    },
  },
}));
