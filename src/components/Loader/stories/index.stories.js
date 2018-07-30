import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Content, { Text } from 'stories/content';
import Loader from 'components/Loader';

const stories = storiesOf('General|Loader', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Content>
          <Text />
          <Loader />
        </Content>
      </Demo>
    );
  },
}));
