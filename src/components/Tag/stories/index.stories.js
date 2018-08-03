import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Demo from 'stories/demo';
import Tag from 'components/Tag';

const stories = storiesOf('Data Display|Tag', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Tag>Text</Tag>
        <Tag closable onClose={action('@close')}>
          Closable
        </Tag>
        <Tag>
          <a target="_blank" href="http://www.hypers.com">
            Link
          </a>
        </Tag>
      </Demo>
    );
  },
}));

stories.add('color', () => ({
  render: h => {
    return (
      <Demo title="Color">
        <Tag color="red">Red</Tag>
        <Tag color="orange">Orange</Tag>
        <Tag color="yellow">Yellow</Tag>
        <Tag color="green">Green</Tag>
        <Tag color="cyan">Cyan</Tag>
        <Tag color="blue">Blue</Tag>
        <Tag color="violet">Violet</Tag>
      </Demo>
    );
  },
}));
