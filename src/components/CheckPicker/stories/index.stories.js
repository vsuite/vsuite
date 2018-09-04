import { storiesOf } from '@storybook/vue';
// import _ from 'lodash';
// import axios from 'axios';
import Demo from 'stories/demo';

import CheckPicker from 'components/CheckPicker';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
// import Icon from 'components/Icon';

const stories = storiesOf('Data Entry|CheckPicker', module);
const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master',
  },
  {
    label: 'Kariane',
    value: 'Kariane',
    role: 'Master',
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master',
  },
  {
    label: 'Marty',
    value: 'Marty',
    role: 'Master',
  },
  {
    label: 'Kenya',
    value: 'Kenya',
    role: 'Master',
  },
  {
    label: 'Hal',
    value: 'Hal',
    role: 'Developer',
  },
  {
    label: 'Julius',
    value: 'Julius',
    role: 'Developer',
  },
  {
    label: 'Travon',
    value: 'Travon',
    role: 'Developer',
  },
  {
    label: 'Vincenza',
    value: 'Vincenza',
    role: 'Developer',
  },
  {
    label: 'Dominic',
    value: 'Dominic',
    role: 'Developer',
  },
  {
    label: 'Pearlie',
    value: 'Pearlie',
    role: 'Guest',
  },
  {
    label: 'Tyrel',
    value: 'Tyrel',
    role: 'Guest',
  },
  {
    label: 'Jaylen',
    value: 'Jaylen',
    role: 'Guest',
  },
  {
    label: 'Rogelio',
    value: 'Rogelio',
    role: 'Guest',
  },
];

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <CheckPicker style={{ width: '224px' }} data={data} />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <CheckPicker
          style={{ width: '224px' }}
          data={data}
          appearance="default"
          placeholder="Default"
        />
        <hr />
        <CheckPicker
          style={{ width: '224px' }}
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
        <CheckPicker block data={data} />
      </Demo>
    );
  },
}));

stories.add('groupBy', () => ({
  render() {
    return (
      <Demo title="GroupBy">
        <CheckPicker style={{ width: '224px' }} data={data} groupBy="role" />
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
              <td>{this._renderCheckPicker(h, 'bottom-start')}</td>
              <td>{this._renderCheckPicker(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderCheckPicker(h, 'right-start')}</td>
              <td />
              <td />
              <td>{this._renderCheckPicker(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderCheckPicker(h, 'right-end')}</td>
              <td />
              <td />
              <td>{this._renderCheckPicker(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderCheckPicker(h, 'top-start')}</td>
              <td>{this._renderCheckPicker(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },

  methods: {
    _renderCheckPicker(h, placement) {
      return (
        <CheckPicker
          data={data}
          placement={placement}
          placeholder={placement}
        />
      );
    },
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <CheckPicker
          block
          data={data}
          groupBy="role"
          placeholder="Select User"
          renderMenuItem={(h, label, item) => {
            return (
              <div>
                <i class="vs-icon vs-icon-user" /> {label}
              </div>
            );
          }}
          renderMenuGroup={(h, label, item) => {
            return (
              <div>
                <i class="vs-icon vs-icon-group" /> {label} - (
                {item.children.length})
              </div>
            );
          }}
          renderValue={(h, value, items) => {
            return (
              <span>
                <span style={{ color: '#575757' }}>
                  <i class="vs-icon vs-icon-user" /> Users :
                </span>{' '}
                {value.join(' , ')}
              </span>
            );
          }}
        />
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <CheckPicker
          style={{ width: '224px' }}
          data={data}
          defaultValue={['Julius']}
          disabled
        />
        <hr />
        <p>禁用选项</p>
        <CheckPicker
          style={{ width: '224px' }}
          data={data}
          defaultValue={['Julius']}
          disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
        />
      </Demo>
    );
  },
}));

stories.add('searchable', () => ({
  render() {
    return (
      <Demo title="Searchable">
        <CheckPicker style={{ width: '224px' }} data={data} />
        <hr />
        <p>禁用搜索</p>
        <CheckPicker
          style={{ width: '224px' }}
          data={data}
          searchable={false}
        />
      </Demo>
    );
  },
}));

stories.add('footer', () => ({
  data() {
    return {
      indeterminate: false,
      checkAll: false,
      value: [],
    };
  },

  render() {
    const footerStyles = {
      padding: '10px 2px',
      borderTop: '1px solid #e5e5e5',
    };

    const footerButtonStyle = {
      float: 'right',
      marginRight: '10px',
      marginTop: '2px',
    };

    return (
      <Demo title="Footer">
        <CheckPicker
          style={{ width: '224px' }}
          data={data}
          placeholder="请选择"
          value={this.value}
          onChange={this._handleChange}
          ref="picker"
        >
          <div style={footerStyles} slot="footer">
            <Checkbox
              inline
              indeterminate={this.indeterminate}
              checked={this.checkAll}
              onChange={this._handleCheckAll}
            >
              全选
            </Checkbox>

            <Button
              style={footerButtonStyle}
              appearance="primary"
              size="sm"
              onClick={() => {
                this.picker.trigger.hide();
              }}
            >
              确定
            </Button>
          </div>
        </CheckPicker>
      </Demo>
    );
  },

  methods: {
    _handleChange() {},

    _handleCheckAll() {},
  },
}));
