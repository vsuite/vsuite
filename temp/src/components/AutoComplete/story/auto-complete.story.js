import { storiesOf } from '@storybook/vue';

import AutoComplete from 'components/AutoComplete';
import InputGroup from 'components/InputGroup';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|AutoComplete', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <AutoComplete
          data={[
            'HYPER Advertiser',
            'HYPER Web Analytics',
            'HYPER Video Analytics',
            'HYPER DMP',
            'HYPER Ad Serving',
            'HYPER Data Discovery',
          ]}
          showOnEmpty
        />
      </Demo>
    );
  },
}));

stories.add('auto-complete', () => ({
  data() {
    return {
      initList: ['@gmail.com', '@sina.com.cn', '@163.com', '@qq.com'],
      list: [],
    };
  },

  render() {
    return (
      <Demo title="Auto-complete">
        <AutoComplete
          placeholder="Email"
          data={this.list}
          onChange={this._handleChange}
        />
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      const at = value.match(/@[\S]*/);
      const nextData = at
        ? this.initList
            .filter(item => item.indexOf(at[0]) >= 0)
            .map(item => `${value}${item.replace(at[0], '')}`)
        : this.initList.map(item => `${value}${item}`);

      this.$set(this, 'list', nextData);
    },
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <AutoComplete
          data={[
            'HYPER Advertiser',
            'HYPER Web Analytics',
            'HYPER Video Analytics',
            'HYPER DMP',
            'HYPER Ad Serving',
            'HYPER Data Discovery',
          ]}
          renderItem={(_, item) => (
            <p>
              <Icon icon="star" /> {item.label}
            </p>
          )}
        />
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <AutoComplete
          data={[
            'HYPER Advertiser',
            'HYPER Web Analytics',
            'HYPER Video Analytics',
            'HYPER DMP',
            'HYPER Ad Serving',
            'HYPER Data Discovery',
          ]}
          disabled
        />
      </Demo>
    );
  },
}));

stories.add('composition', () => ({
  render() {
    const data = [
      'HYPER Advertiser',
      'HYPER Web Analytics',
      'HYPER Video Analytics',
      'HYPER DMP',
      'HYPER Ad Serving',
      'HYPER Data Discovery',
    ];
    const styles = {
      width: '300px',
      marginBottom: '10px',
    };

    return (
      <Demo title="Composition">
        <InputGroup style={styles}>
          <AutoComplete data={data} transfer />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>

        <InputGroup inside style={styles}>
          <AutoComplete data={data} transfer />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>

        <InputGroup inside style={styles}>
          <AutoComplete data={data} transfer />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>

        <InputGroup inside style={styles}>
          <InputGroup.Addon>
            <Icon icon="avatar" />
          </InputGroup.Addon>
          <AutoComplete data={data} transfer />
        </InputGroup>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <AutoComplete
          data={[
            'HYPER Advertiser',
            'HYPER Web Analytics',
            'HYPER Video Analytics',
            'HYPER DMP',
            'HYPER Ad Serving',
            'HYPER Data Discovery',
          ]}
          value="HYPER"
          visible={true}
        />
      </Demo>
    );
  },
}));
