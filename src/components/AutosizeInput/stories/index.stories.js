import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

import AutosizeInput from 'components/AutosizeInput';

const stories = storiesOf('Utils|AutosizeInput', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <AutosizeInput inputStyle={{ maxWidth: '100px' }} />
      </Demo>
    );
  },
}));

stories.add('placeholder', () => ({
  render() {
    return (
      <Demo title="Placeholder">
        <AutosizeInput
          placeholder="Please enter"
          inputStyle={{ maxWidth: '300px' }}
        />
      </Demo>
    );
  },
}));
