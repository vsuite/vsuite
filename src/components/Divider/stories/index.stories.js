import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Content, { Text } from 'stories/content';
import Divider from 'components/Divider';

const stories = storiesOf('General|Divider', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Content>
          <Text />
          <Divider />
          <Text />
        </Content>
      </Demo>
    );
  },
}));

stories.add('with-text', () => ({
  render: h => {
    return (
      <Demo title="With Text">
        <Content>
          <Text />
          <Divider>Second Stage</Divider>
          <Text />
        </Content>
      </Demo>
    );
  },
}));

stories.add('vertical', () => ({
  render: h => {
    return (
      <Demo title="Vertical">
        <Content>
          <a>Edit</a>
          <Divider vertical />
          <a>Update</a>
          <Divider vertical />
          <a>Save</a>
        </Content>
      </Demo>
    );
  },
}));
