import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import axios from 'axios';
import shallowEqual from 'utils/shallowEqual';
import Demo from 'stories/demo';

import TagPicker from 'components/TagPicker';
import Icon from 'components/Icon';

const stories = storiesOf('Data Entry|TagPicker', module);
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
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
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
        <TagPicker block menuStyle={{ width: '300px' }} data={data} />
      </Demo>
    );
  },
}));

stories.add('groupBy', () => ({
  render() {
    return (
      <Demo title="GroupBy">
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
          data={data}
          groupBy="role"
        />
      </Demo>
    );
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
