import { storiesOf } from '@storybook/vue';

import Loader from 'components/Loader';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';

const stories = storiesOf('General|Loader', module);

stories.add('basic', () => ({
  render: h => {
    return (
      <Demo title="Basic">
        <Loader />
      </Demo>
    );
  },
}));

stories.add('vertical', () => ({
  render: h => {
    return (
      <Demo title="Vertical">
        <Loader content="Loading..." />
        <hr />
        <Loader vertical content="Loading..." />
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render: h => {
    return (
      <Demo title="Size">
        <Loader size="xs" content="XSmall" />
        <hr />
        <Loader size="sm" content="Small" />
        <hr />
        <Loader size="md" content="Small" />
        <hr />
        <Loader size="lg" content="Small" />
      </Demo>
    );
  },
}));

stories.add('speed', () => ({
  render: h => {
    return (
      <Demo title="speed">
        <Loader speed="slow" content="Slow" />
        <hr />
        <Loader speed="normal" content="Normal" />
        <hr />
        <Loader speed="fast" content="Fast" />
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
          <Loader backdrop vertical content="loading" />
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
            content="loading..."
          />
        </Content>
      </Demo>
    );
  },
}));
