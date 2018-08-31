import { storiesOf } from '@storybook/vue';
import _ from 'lodash';
import axios from 'axios';
import Demo from 'stories/demo';

import InputPicker from 'components/InputPicker';
import Icon from 'components/Icon';

const stories = storiesOf('Data Entry|InputPicker', module);
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
      </Demo>
    );
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
    this._getUsers('vue');

    return {
      items: [],
      loading: true,
    };
  },

  render() {
    return (
      <Demo title="Request">
        <InputPicker
          style={{ width: '224px' }}
          data={this.items}
          labelKey="login"
          valueKey="id"
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
    _handleSearch(val) {
      this.loading = true;

      this._getUsers(val || 'vue');
    },

    _getUsers(word) {
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
    },
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
