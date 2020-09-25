import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import axios from 'axios';
import data from 'stories/data/user';

import InputPicker from 'components/InputPicker';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|InputPicker', module);

stories.add('baisc', () => ({
  render() {
    return (
      <Demo title="Basic">
        <InputPicker data={data} style={{ width: '224px' }} />
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <InputPicker block data={data} />
      </Demo>
    );
  },
}));

stories.add('groupBy', () => ({
  render() {
    return (
      <Demo title="GroupBy">
        <InputPicker data={data} groupBy="role" style={{ width: '224px' }} />
        <hr />
        <h5>Sort:</h5>
        <InputPicker
          data={data}
          groupBy="role"
          sort={this.sort}
          style={{ width: '224px' }}
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
        <InputPicker creatable data={data} style={{ width: '224px' }} />
        <hr />
        <InputPicker
          creatable
          data={data}
          style={{ width: '224px' }}
          groupBy="role"
        />
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <InputPicker
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
        <InputPicker
          data={data}
          defaultValue={'Julius'}
          disabled
          style={{ width: '224px' }}
        />
        <hr />
        <p>禁用选项</p>
        <InputPicker
          data={data}
          defaultValue={'Julius'}
          disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
          style={{ width: '224px' }}
        />
      </Demo>
    );
  },
}));

stories.add('request', () => ({
  data() {
    return {
      items: [],
      loading: true,
    };
  },

  mounted() {
    this._getUsers('vue');
  },

  render() {
    return (
      <Demo title="Request">
        <InputPicker
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

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <InputPicker
          visible
          value={'Julius'}
          data={data}
          style={{ width: '224px' }}
        />
      </Demo>
    );
  },
}));
