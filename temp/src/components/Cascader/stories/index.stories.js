import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import { mapNode } from 'utils/tree';
import data from 'stories/data/province';

import Cascader from 'components/Cascader';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Cascader', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Cascader
          style={{ width: '224px' }}
          labelKey="name"
          valueKey="name"
          data={data}
        />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <Cascader
          style={{ width: '224px' }}
          labelKey="name"
          valueKey="name"
          data={data}
          appearance="default"
          placeholder="Default"
        />
        <hr />
        <Cascader
          style={{ width: '224px' }}
          labelKey="name"
          valueKey="name"
          data={data}
          appearance="subtle"
          placeholder="Subtle"
        />
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <Cascader block labelKey="name" valueKey="name" data={data} />
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
              <td>{this._renderCascader(h, 'bottom-start')}</td>
              <td>{this._renderCascader(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderCascader(h, 'right-start')}</td>
              <td />
              <td />
              <td>{this._renderCascader(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderCascader(h, 'right-end')}</td>
              <td />
              <td />
              <td>{this._renderCascader(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderCascader(h, 'top-start')}</td>
              <td>{this._renderCascader(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },

  methods: {
    _renderCascader(h, placement) {
      return (
        <Cascader
          labelKey="name"
          valueKey="name"
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
        <Cascader
          style={{ width: '224px' }}
          disabled
          labelKey="name"
          valueKey="name"
          data={data}
        />
        <hr />
        <p>禁用选项</p>
        <Cascader
          style={{ width: '224px' }}
          labelKey="name"
          valueKey="name"
          data={data}
          disabledItemValues={['北京', '成都市', '黄浦区']}
        />
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <Cascader
          style={{ width: '224px' }}
          valueKey="name"
          labelKey="name"
          data={data}
          renderMenuItem={(h, label, item) => {
            return (
              <div>
                <i class="vs-icon vs-icon-circle" /> {label}
              </div>
            );
          }}
          renderValue={(h, datasets) => {
            return datasets.map(item => item.name).join(' : ');
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
        <Cascader
          style={{ width: '272px' }}
          data={this.data}
          value={this.value}
          onShow={this._handleShow}
          onChange={this._handleChange}
          onSelect={this._handleSelect}
          renderMenu={(h, menu, data) => {
            if (this.data.length === 0 || (data && data.loading)) {
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
        />
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },

    _handleSelect({ data }) {
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
