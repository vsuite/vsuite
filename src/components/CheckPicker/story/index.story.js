import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import axios from 'axios';
import shallowEqual from 'utils/shallowEqual';
import data from 'stories/data/user';

import CheckPicker from 'components/CheckPicker';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|CheckPicker', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
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

stories.add('creatable', () => ({
  render() {
    return (
      <Demo title="Creatable">
        <CheckPicker style={{ width: '224px' }} creatable data={data} />
        <hr />
        <CheckPicker
          style={{ width: '224px' }}
          creatable
          data={data}
          groupBy="role"
        />
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
              Select All
            </Checkbox>

            <Button
              style={footerButtonStyle}
              appearance="primary"
              size="sm"
              onClick={() => this.$refs.picker.hide()}
            >
              Ok
            </Button>
          </div>
        </CheckPicker>
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      const allValue = data.map(item => item.value);

      this.value = value;
      this.indeterminate = value.length > 0 && value.length < allValue.length;
      this.checkAll = value.length === allValue.length;
    },

    _handleCheckAll(value, checked) {
      const allValue = data.map(item => item.value);

      this.value = checked ? allValue : [];
      this.indeterminate = false;
      this.checkAll = checked;
    },
  },
}));

stories.add('request', () => ({
  data() {
    this._getUsers('vue');

    return {
      value: [],
      items: [],
      cacheItems: [],
      loading: true,
    };
  },

  render() {
    return (
      <Demo title="Request">
        <CheckPicker
          style={{ width: '300px' }}
          value={this.value}
          data={this.items}
          cacheData={this.cacheItems}
          labelKey="login"
          valueKey="id"
          onChange={this._handleChange}
          onSearch={_.debounce(this._handleSearch.bind(this), 300)}
          renderMenu={(h, menu) => {
            if (this.loading) {
              return (
                <p
                  style={{ padding: '4px', color: '#999', textAlign: 'center' }}
                >
                  <Icon icon="spinner" spin /> Loading...
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
    _handleChange(val) {
      this.value = val;
    },

    _handleSearch(val) {
      this.loading = true;

      this._getUsers(val || 'vue');
    },

    _getUsers(word) {
      axios
        .get('https://api.github.com/search/users', { params: { q: word } })
        .then(({ data }) => {
          this.cacheItems.push(
            ...this.items.filter(x =>
              this.value.some(y => shallowEqual(x.id, y))
            )
          );
          this.items = data.items || [];
          this.loading = false;
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.log('Oops, error', e);

          this.loading = false;
        });
    },
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <CheckPicker
          style={{ width: '300px' }}
          visible
          value={['Julius']}
          data={data}
        />
      </Demo>
    );
  },
}));
