import { storiesOf } from '@storybook/vue';

import Radio from 'components/Radio';
import Demo from 'stories/demo';

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
