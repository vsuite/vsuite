import { storiesOf } from '@storybook/vue';

import Divider from 'components/Divider';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';

const stories = storiesOf('General|Divider', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Content>
          <Paragraph />
          <Divider />
          <Paragraph />
        </Content>
      </Demo>
    );
  },
}));

stories.add('with-text', () => ({
  render() {
    return (
      <Demo title="With Text">
        <Content>
          <Paragraph />
          <Divider>Second Stage</Divider>
          <Paragraph />
        </Content>
      </Demo>
    );
  },
}));

stories.add('vertical', () => ({
  render() {
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
