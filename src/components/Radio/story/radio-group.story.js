import { storiesOf } from '@storybook/vue';
import JsonPretty from 'vue-json-pretty';

import Radio from 'components/Radio';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Radio.Group', module);

stories.add('basic', () => ({
  data() {
    return { value: 'A' };
  },

  render() {
    return (
      <Demo title="Basic">
        <Radio.Group value={this.value} onChange={this._handleChange}>
          <p>Group1</p>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <p>Group2</p>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>

        <hr />

        <JsonPretty data={{ value: this.value }} />
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },
  },
}));

stories.add('initial', () => ({
  render() {
    return (
      <Demo title="Initial">
        <Radio.Group defaultValue="A" inline>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>
      </Demo>
    );
  },
}));

stories.add('inline', () => ({
  data() {
    return { value: 'A' };
  },

  render() {
    return (
      <Demo title="Inline">
        <Radio.Group inline value={this.value} onChange={this._handleChange}>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>

        <hr />

        <JsonPretty data={{ value: this.value }} />
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },
  },
}));

stories.add('picker', () => ({
  data() {
    return { value: 'A' };
  },

  render() {
    return (
      <Demo title="Picker">
        <Radio.Group
          inline
          appearance="picker"
          value={this.value}
          onChange={this._handleChange}
        >
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>

        <hr />

        <JsonPretty data={{ value: this.value }} />
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <Radio.Group value="A" inline>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>
      </Demo>
    );
  },
}));
