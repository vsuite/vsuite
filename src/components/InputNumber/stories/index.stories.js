import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import InputNumber from 'components/InputNumber';

const stories = storiesOf('Data Entry|InputNumber', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <InputNumber style={{ width: '160px' }} />
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
          <InputNumber size="lg" style={styles} placeholder="lg" />
          <InputNumber size="md" style={styles} placeholder="md" />
          <InputNumber size="sm" style={styles} placeholder="sm" />
          <InputNumber size="xs" style={styles} placeholder="xs" />
        </div>
      </Demo>
    );
  },
}));

stories.add('float', () => ({
  data() {
    return { value: 0.01 };
  },

  render() {
    return (
      <Demo title="Float">
        <div style={{ width: '160px' }}>
          <InputNumber
            value={this.value}
            step={0.01}
            onChange={v => (this.value = v)}
          />
        </div>
      </Demo>
    );
  },
}));

stories.add('range', () => ({
  data() {
    return { value: 10 };
  },

  render() {
    return (
      <Demo title="Range">
        <div style={{ width: '160px' }}>
          <InputNumber
            value={this.value}
            max={100}
            min={10}
            onChange={v => (this.value = v)}
          />
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
  render() {
    return (
      <Demo title="Controlled">
        <div style={{ width: '160px' }}>
          <InputNumber value={0.01} step={0.01} />
        </div>
      </Demo>
    );
  },
}));
