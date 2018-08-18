import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Toggle from 'components/Toggle';
import Icon from 'components/Icon';

const stories = storiesOf('Data Entry|Toggle', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Toggle style={{ marginRight: '8px' }} />
        <Toggle style={{ marginRight: '8px' }} checked />
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render() {
    return (
      <Demo title="Size">
        <Toggle style={{ marginRight: '8px' }} size="lg" />
        <Toggle style={{ marginRight: '8px' }} size="md" />
        <Toggle style={{ marginRight: '8px' }} size="sm" />
      </Demo>
    );
  },
}));

stories.add('text & icon', () => ({
  render() {
    return (
      <Demo title="Text & Icon">
        <Toggle
          style={{ marginRight: '8px' }}
          size="lg"
          open="打开"
          close="关闭"
        />

        <Toggle style={{ marginRight: '8px' }}>
          <Icon slot="open" icon="check" />
          <Icon slot="close" icon="close" />
        </Toggle>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="disabled">
        <Toggle disabled />
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <Toggle checked={true} />
      </Demo>
    );
  },
}));
