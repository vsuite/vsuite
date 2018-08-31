import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

import AutosizeInput from 'components/AutosizeInput';

const stories = storiesOf('Utils|AutosizeInput', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <AutosizeInput
          id="my-autosize-input"
          inputStyle={{ maxWidth: '100px' }}
        />
      </Demo>
    );
  },
}));
