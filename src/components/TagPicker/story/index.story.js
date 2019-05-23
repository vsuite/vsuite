import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import axios from 'axios';
import shallowEqual from 'utils/shallowEqual';
import data from 'stories/data/user';

import TagPicker from 'components/TagPicker';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|TagPicker', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <TagPicker style={{ width: '300px' }} data={data} />
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <TagPicker block data={data} />
      </Demo>
    );
  },
}));

stories.add('groupBy', () => ({
  render() {
    return (
      <Demo title="GroupBy">
        <TagPicker style={{ width: '300px' }} data={data} groupBy="role" />
        <hr />
        <h5>Sort:</h5>
        <TagPicker
          style={{ width: '300px' }}
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
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
          creatable
          data={data}
        />
        <hr />
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
          creatable
          data={data}
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
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
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
                  <i class="vs-icon vs-icon-user" />
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
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
          disabled
          data={data}
          defaultValue={['Julius']}
        />
        <hr />
        <p>禁用选项</p>
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
          data={data}
          defaultValue={['Julius']}
          disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
        />
      </Demo>
    );
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
        <TagPicker
          style={{ width: '300px' }}
          value={this.value}
          data={this.items}
          cacheData={this.cacheItems}
          labelKey="login"
          valueKey="id"
          onChange={this._handleChange}
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
    _handleChange(val) {
      this.value = val;
    },

    _handleSearch(val) {
      this.loading = true;

      this._getUsers(val || 'vue');
    },

    _getUsers: _.debounce(function(word) {
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
    }),
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <TagPicker
          style={{ width: '300px' }}
          visible
          value={['Julius']}
          data={data}
        />
      </Demo>
    );
  },
}));
