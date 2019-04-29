import { storiesOf } from '@storybook/vue';
import JsonPretty from 'vue-json-pretty';

import Checkbox from 'components/Checkbox';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Checkbox.Group', module);

stories.add('basic', () => ({
  data() {
    return { value: [] };
  },

  render() {
    return (
      <Demo title="Basic">
        <Checkbox.Group
          inline
          value={this.value}
          onChange={v => (this.value = v)}
        >
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D">Item D</Checkbox>
        </Checkbox.Group>

        <hr />

        <JsonPretty data={this.value} />
      </Demo>
    );
  },
}));

stories.add('initial', () => ({
  render() {
    return (
      <Demo title="Initial">
        <Checkbox.Group inline defaultValue={['A']}>
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D">Item D</Checkbox>
        </Checkbox.Group>
      </Demo>
    );
  },
}));

stories.add('indeterminate', () => ({
  data() {
    return {
      options: ['A', 'B', 'C', 'D'],
      value: [],
      indeterminate: false,
      checkAll: false,
    };
  },

  render() {
    return (
      <Demo title="Indeterminate">
        <Checkbox
          indeterminate={this.indeterminate}
          checked={this.checkAll}
          onChange={this._handleCheckAll}
        >
          Check All
        </Checkbox>

        <hr />

        <Checkbox.Group inline value={this.value} onChange={this._handleChange}>
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D">Item D</Checkbox>
        </Checkbox.Group>

        <hr />

        <JsonPretty data={this.value} />
      </Demo>
    );
  },

  methods: {
    _handleChange(v) {
      const optionsLen = this.options.length;
      const valueLen = v ? v.length : 0;

      this.value = v;
      this.indeterminate = optionsLen > valueLen && valueLen > 0;
      this.checkAll = optionsLen === valueLen;
    },

    _handleCheckAll(checked) {
      this.value = checked ? [...this.options] : [];
      this.indeterminate = false;
      this.checkAll = checked;
    },
  },
}));

stories.add('group', () => ({
  data() {
    return { value: [] };
  },

  render() {
    return (
      <Demo title="Group">
        <Checkbox.Group value={this.value} onChange={v => (this.value = v)}>
          <p>Group1</p>
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <p>Group2</p>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D" disabled>
            Item D
          </Checkbox>
        </Checkbox.Group>

        <hr />

        <JsonPretty data={this.value} />
      </Demo>
    );
  },
}));

stories.add('inline', () => ({
  render() {
    return (
      <Demo title="Inline">
        <Checkbox.Group inline>
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D" disabled>
            Item D
          </Checkbox>
        </Checkbox.Group>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <Checkbox.Group value={['A', 'C']} inline>
          <Checkbox value="A">Item A</Checkbox>
          <Checkbox value="B">Item B</Checkbox>
          <Checkbox value="C">Item C</Checkbox>
          <Checkbox value="D" disabled>
            Item D
          </Checkbox>
        </Checkbox.Group>
      </Demo>
    );
  },
}));
