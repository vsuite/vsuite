import { storiesOf } from '@storybook/vue';

import Loader from 'components/Loader';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';

const stories = storiesOf('General|Loader', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Content>
          <Loader />
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
          <Loader content="Loading..." />
        </Content>
        <Content>
          <Loader vertical content="Loading..." />
        </Content>
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render: h => {
    return (
      <Demo title="Size">
        <Content>
          <Loader size="xs" content="XSmall" />
        </Content>
        <Content>
          <Loader size="sm" content="Small" />
        </Content>
        <Content>
          <Loader size="md" content="Small" />
        </Content>
        <Content>
          <Loader size="lg" content="Small" />
        </Content>
      </Demo>
    );
  },
}));

stories.add('speed', () => ({
  render: h => {
    return (
      <Demo title="speed">
        <Content>
          <Loader speed="slow" content="Slow" />
        </Content>
        <Content>
          <Loader speed="normal" content="Normal" />
        </Content>
        <Content>
          <Loader speed="fast" content="Fast" />
        </Content>
      </Demo>
    );
  },
}));

stories.add('center', () => ({
  render: h => {
    return (
      <Demo title="Center">
        <Content>
          <Paragraph />
          <Loader center content="loading" />
        </Content>
      </Demo>
    );
  },
}));

stories.add('backdrop', () => ({
  render: h => {
    return (
      <Demo title="Backdrop">
        <Content>
          <Paragraph />
          <Loader center backdrop content="loading" />
        </Content>
      </Demo>
    );
  },
}));

stories.add('inverse', () => ({
  render: h => {
    return (
      <Demo title="Inverse">
        <Content>
          <Paragraph />
          <Loader
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            center
            inverse
            content="loading"
          />
        </Content>
      </Demo>
    );
  },
}));
