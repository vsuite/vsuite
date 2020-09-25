import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import axios from 'axios';
import data from 'stories/data/user';

import SelectPicker from 'components/SelectPicker';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|SelectPicker', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <SelectPicker style={{ width: '224px' }} data={data} />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <SelectPicker
          style={{ width: '224px' }}
          data={data}
          appearance="default"
          placeholder="Default"
        />
        <hr />
        <SelectPicker
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
        <SelectPicker block data={data} />
      </Demo>
    );
  },
}));

stories.add('groupBy', () => ({
  render() {
    return (
      <Demo title="GroupBy">
        <SelectPicker style={{ width: '224px' }} data={data} groupBy="role" />
        <hr />
        <h5>Sort:</h5>
        <SelectPicker
          style={{ width: '224px' }}
          data={data}
          groupBy="role"
          sort={this.sort}
        />
      </Demo>
    );
  },

  methods: {
    sort(isGroup) {
      if (isGroup) {
        return (a, b) => {
          return this.compare(a.groupTitle, b.groupTitle);
        };
      }

      return (a, b) => {
        return this.compare(a.value, b.value);
      };
    },

    compare(a, b) {
      let nameA = a.toUpperCase();
      let nameB = b.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    },
  },
}));

stories.add('creatable', () => ({
  render() {
    return (
      <Demo title="Creatable">
        <SelectPicker style={{ width: '224px' }} creatable data={data} />
        <hr />
        <SelectPicker
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
              <td>{this._renderSelectPicker(h, 'bottom-start')}</td>
              <td>{this._renderSelectPicker(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderSelectPicker(h, 'right-start')}</td>
              <td />
              <td />
              <td>{this._renderSelectPicker(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderSelectPicker(h, 'right-end')}</td>
              <td />
              <td />
              <td>{this._renderSelectPicker(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderSelectPicker(h, 'top-start')}</td>
              <td>{this._renderSelectPicker(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },

  methods: {
    _renderSelectPicker(h, placement) {
      return (
        <SelectPicker
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
        <SelectPicker
          style={{ width: '224px' }}
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
          renderValue={(h, label, item) => {
            return (
              <div>
                <span style={{ color: '#575757' }}>
                  <i class="vs-icon vs-icon-user" /> User :
                </span>{' '}
                {label}
              </div>
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
        <SelectPicker
          style={{ width: '224px' }}
          data={data}
          defaultValue={'Julius'}
          disabled
        />
        <hr />
        <p>禁用选项</p>
        <SelectPicker
          style={{ width: '224px' }}
          data={data}
          defaultValue={'Julius'}
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
        <SelectPicker style={{ width: '224px' }} data={data} />
        <hr />
        <p>禁用搜索</p>
        <SelectPicker
          style={{ width: '224px' }}
          data={data}
          searchable={false}
        />
      </Demo>
    );
  },
}));

stories.add('request', () => ({
  data() {
    this._getUsers('vue');

    return {
      items: [],
      loading: true,
    };
  },

  render() {
    return (
      <Demo title="Request">
        <SelectPicker
          style={{ width: '224px' }}
          data={this.items}
          labelKey="login"
          valueKey="id"
          onSearch={this._handleSearch}
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
    _handleSearch(val) {
      this.loading = true;

      this._getUsers(val || 'vue');
    },

    _getUsers: _.debounce(function(word) {
      axios
        .get('https://api.github.com/search/users', { params: { q: word } })
        .then(({ data }) => {
          this.items = data.items || [];
          this.loading = false;
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.log('Oops, error', e);

          this.loading = false;
        });
    }, 300),
  },
}));

stories.add('container', () => ({
  render() {
    return (
      <Demo title="Container">
        <div
          style={{
            position: 'relative',
            height: '200px',
            overflow: 'auto',
            boxShadow: '#999 1px 1px 5px inset',
            padding: '50px',
          }}
        >
          <div style={{ height: '500px' }}>
            <SelectPicker
              style={{ width: '224px' }}
              data={data}
              modifiers={{
                preventOverflow: { enabled: false },
                flip: { enabled: false },
              }}
            />
          </div>
        </div>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <SelectPicker
          visible
          value={'Julius'}
          data={data}
          style={{ width: '224px' }}
        />
      </Demo>
    );
  },
}));
