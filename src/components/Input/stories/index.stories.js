import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Input from 'components/Input';

const stories = storiesOf('Data Entry|Input', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Input style={{ width: '300px' }} placeholder="Default Input" />
      </Demo>
    );
  },
}));
