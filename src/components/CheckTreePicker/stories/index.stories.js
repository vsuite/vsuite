import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import { mapNode } from 'utils/tree';
import data from 'stories/data/city';

import CheckTreePicker from 'components/CheckTreePicker';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|CheckTreePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <CheckTreePicker style={{ width: '272px' }} data={data} />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <CheckTreePicker
          style={{ width: '272px' }}
          data={data}
          appearance="default"
          placeholder="Default"
        />
        <hr />
        <CheckTreePicker
          style={{ width: '272px' }}
          data={data}
          appearance="subtle"
          placeholder="Subtle"
        />
      </Demo>
    );
  },
}));

stories.add('cascade', () => ({
  render() {
    return (
      <Demo title="Cascade">
        <CheckTreePicker style={{ width: '272px' }} leaf data={data} />
        <hr />
        <p>Not allow cascade</p>
        <CheckTreePicker
          cascade={false}
          style={{ width: '272px' }}
          data={data}
        />
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <CheckTreePicker block data={data} />
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
              <td>{this._renderCheckTreePicker(h, 'bottom-start')}</td>
              <td>{this._renderCheckTreePicker(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderCheckTreePicker(h, 'right-start')}</td>
              <td />
              <td />
              <td>{this._renderCheckTreePicker(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderCheckTreePicker(h, 'right-end')}</td>
              <td />
              <td />
              <td>{this._renderCheckTreePicker(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderCheckTreePicker(h, 'top-start')}</td>
              <td>{this._renderCheckTreePicker(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },

  methods: {
    _renderCheckTreePicker(h, placement) {
      return (
        <CheckTreePicker
          data={data}
          placement={placement}
          placeholder={placement}
        />
      );
    },
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <CheckTreePicker style={{ width: '272px' }} disabled data={data} />
        <hr />
        <p>禁用选项</p>
        <CheckTreePicker
          style={{ width: '272px' }}
          data={data}
          disabledItemValues={[{ id: 2 }]}
        />
        <hr />
        <p>禁用选择框</p>
        <CheckTreePicker
          style={{ width: '272px' }}
          data={data}
          disabledCheckboxValues={[{ id: 2 }]}
        />
      </Demo>
    );
  },
}));

stories.add('searchable', () => ({
  render() {
    return (
      <Demo title="Searchable">
        <CheckTreePicker
          style={{ width: '272px' }}
          data={data}
          searchable={false}
        />
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <CheckTreePicker
          style={{ width: '272px' }}
          data={data}
          renderTreeNode={(h, data) => {
            return (
              <span>
                <i class="vs-icon vs-icon-map-marker" /> {data.label}
              </span>
            );
          }}
          renderValue={(h, value, checkedItems) => {
            return (
              <span>
                <span style={{ color: '#575757' }}>
                  <i class="vs-icon vs-icon-map-marker" /> 地区 :
                </span>{' '}
                {checkedItems.map(item => item.label).join(' , ')}
              </span>
            );
          }}
        >
          <span slot="placeholder">
            <i class="vs-icon vs-icon-map-marker" /> 选择地区
          </span>
        </CheckTreePicker>
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
        <CheckTreePicker
          style={{ width: '272px' }}
          cascade={false}
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
