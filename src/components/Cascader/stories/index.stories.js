import { storiesOf } from '@storybook/vue';
import data from 'stories/data/province';

import Cascader from 'components/Cascader';
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
