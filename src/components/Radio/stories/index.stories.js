import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Radio from 'components/Radio';

const stories = storiesOf('Data Entry|Radio', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Radio> Radio</Radio>
        <Radio checked> Checked Radio</Radio>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <Radio disabled>Radio</Radio>
        <Radio disabled checked>
          Checked Radio
        </Radio>
      </Demo>
    );
  },
}));
