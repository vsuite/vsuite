import { storiesOf } from '@storybook/vue';
import data from 'stories/data/city';

import CheckTreePicker from 'components/CheckTreePicker';
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
