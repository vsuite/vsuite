import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';

import Icon from 'components/Icon';
import IconStack from 'components/IconStack';
import Demo from 'stories/demo';

import vsuiteSvgIcon from './vsuite.svg';

const stories = storiesOf('General|Icon', module);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Icon icon="star" />
      </Demo>
    );
  },
}));

stories.add('dynamic', () => ({
  render: h => {
    return (
      <Demo title="Dynamic">
        <span style={{ margin: '10px' }}>
          <Icon icon="spinner" spin />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="spinner" pulse />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="cog" spin />
        </span>
      </Demo>
    );
  },
}));

stories.add('rotate', () => ({
  render: h => {
    return (
      <Demo title="Rotate">
        <span style={{ margin: '10px' }}>
          <Icon icon="shield" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="shield" rotate={90} />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="shield" rotate={180} />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="shield" rotate={270} />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="shield" flip="horizontal" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="shield" flip="vertical" />
        </span>
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render: h => {
    return (
      <Demo title="size">
        <span style={{ margin: '10px' }}>
          <Icon icon="camera-retro" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="camera-retro" size="lg" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="camera-retro" size="2x" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="camera-retro" size="3x" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="camera-retro" size="4x" />
        </span>
        <span style={{ margin: '10px' }}>
          <Icon icon="camera-retro" size="5x" />
        </span>
      </Demo>
    );
  },
}));

stories.add('stack', () => ({
  render: h => {
    return (
      <Demo title="stack">
        <span style={{ margin: '10px' }}>
          <IconStack size="lg">
            <Icon icon="square" stack="2x" />
            <Icon icon="terminal" stack="1x" inverse />
          </IconStack>
        </span>
        <span style={{ margin: '10px' }}>
          <IconStack size="lg">
            <Icon icon="camera" stack="1x" />
            <Icon icon="ban" stack="2x" status="danger" />
          </IconStack>
        </span>
      </Demo>
    );
  },
}));

stories.add('svg', () => ({
  render: h => {
    return (
      <Demo title="SVG">
        <Icon icon={vsuiteSvgIcon} size="2x" />
      </Demo>
    );
  },
}));
