import { storiesOf } from '@storybook/vue';

import Checkbox from 'components/Checkbox';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Checkbox', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Checkbox>Default</Checkbox>
        <Checkbox checked>Checked</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <Checkbox disabled>Default</Checkbox>
        <Checkbox checked disabled>
          Checked
        </Checkbox>
        <Checkbox indeterminate disabled>
          Indeterminate
        </Checkbox>
      </Demo>
    );
  },
}));
