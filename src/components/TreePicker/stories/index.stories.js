import { storiesOf } from '@storybook/vue';
import data from 'stories/data/city';

import TreePicker from 'components/TreePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|TreePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
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
        <table>
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
          renderValue={(h, activeNode, placeholder) => {
            return activeNode ? (
              <span>
                <i class="vs-icon vs-icon-map-marker" /> {activeNode.label}
              </span>
            ) : (
              placeholder
            );
          }}
        />
      </Demo>
    );
  },
}));
