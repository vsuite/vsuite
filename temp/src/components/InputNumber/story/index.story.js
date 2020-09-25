import { storiesOf } from '@storybook/vue';

import InputNumber from 'components/InputNumber';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|InputNumber', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <InputNumber style={{ width: '160px' }} />
      </Demo>
    );
  },
}));

stories.add('placeholder', () => ({
  render() {
    return (
      <Demo title="Placeholder">
        <InputNumber placeholder="Price" style={{ width: '160px' }} />
      </Demo>
    );
  },
}));

stories.add('initial', () => ({
  render() {
    return (
      <Demo title="Initial">
        <InputNumber defaultValue={10} style={{ width: '160px' }} />
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render() {
    const styles = { marginBottom: '10px' };

    return (
      <Demo title="Size">
        <div style={{ width: '160px' }}>
          <InputNumber size="lg" style={styles} placeholder="Large" />
          <InputNumber size="md" style={styles} placeholder="Medium" />
          <InputNumber size="sm" style={styles} placeholder="Small" />
          <InputNumber size="xs" style={styles} placeholder="XSmall" />
        </div>
      </Demo>
    );
  },
}));

stories.add('decimals', () => ({
  render() {
    return (
      <Demo title="Decimals">
        <div style={{ width: '160px' }}>
          <InputNumber defaultValue={0.01} step={0.01} />
        </div>
      </Demo>
    );
  },
}));

stories.add('max & min', () => ({
  render() {
    return (
      <Demo title="Max & Min">
        <div style={{ width: '160px' }}>
          <InputNumber defaultValue={10} max={100} min={10} />
        </div>
      </Demo>
    );
  },
}));

stories.add('step', () => ({
  render() {
    return (
      <Demo title="Step">
        <div style={{ width: '160px' }}>
          <InputNumber step={10} />
        </div>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <div style={{ width: '160px' }}>
          <InputNumber disabled />
        </div>
      </Demo>
    );
  },
}));

stories.add('combination', () => ({
  render() {
    return (
      <Demo title="Combination">
        <div style={{ width: '160px' }}>
          <InputNumber prefix="$" />
          <hr />
          <InputNumber postfix="￥" />
          <hr />
          <InputNumber postfix="%" />
        </div>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  data() {
    return { value: 0.01 };
  },

  render() {
    return (
      <Demo title="Controlled">
        <div style={{ width: '160px' }}>
          <InputNumber value={0.01} step={0.01} />

          <hr />

          <InputNumber
            value={this.value}
            step={0.01}
            onChange={this._handleChange}
          />
        </div>
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },
  },
}));
