import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Icon from 'components/Icon';
import Demo from 'stories/demo';
import * as SvgIcons from 'stories/svg';

const IconButton = Button.Icon;

const stories = storiesOf('General|Icon', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Icon icon="star" />
      </Demo>
    );
  },
}));

stories.add('spin', () => ({
  render() {
    return (
      <Demo title="Spin">
        <Icon style="margin-right: 5px" icon="spinner" spin />
        <Icon style="margin-right: 5px" icon="spinner" pulse />
        <Icon icon="cog" spin />
      </Demo>
    );
  },
}));

stories.add('rotate', () => ({
  render() {
    return (
      <Demo title="Rotate">
        <Icon style="margin-right: 5px" icon="shield" rotate="90" />
        <Icon style="margin-right: 5px" icon="shield" rotate="180" />
        <Icon style="margin-right: 5px" icon="shield" rotate="270" />
        <Icon style="margin-right: 5px" icon="shield" flip="horizontal" />
        <Icon icon="shield" flip="vertical" />
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render() {
    return (
      <Demo title="Size">
        <Icon style="margin-right: 5px" icon="camera-retro" size="lg" />
        <Icon style="margin-right: 5px" icon="camera-retro" size="2x" />
        <Icon style="margin-right: 5px" icon="camera-retro" size="3x" />
        <Icon style="margin-right: 5px" icon="camera-retro" size="4x" />
        <Icon icon="camera-retro" size="5x" />
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <Icon style="margin-right: 5px" icon={SvgIcons.vsuite} size="lg" />
        <Icon style="margin-right: 5px" icon={SvgIcons.guide} size="lg" />
        <Icon style="margin-right: 5px" icon={SvgIcons.component} size="lg" />
        <Icon style="margin-right: 5px" icon={SvgIcons.tools} size="lg" />
        <Icon icon={SvgIcons.search} size="lg" />
      </Demo>
    );
  },
}));

stories.add('custom-svg', () => ({
  render() {
    return (
      <Demo title="Custom Svg">
        <IconButton appearance="ghost" size="lg">
          <Icon
            slot="icon"
            style="fill: currentColor"
            icon={SvgIcons.search}
            size="lg"
          />
          Search
        </IconButton>
      </Demo>
    );
  },
}));
