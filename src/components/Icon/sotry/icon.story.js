import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Icon from 'components/Icon';
import Demo from 'stories/demo';
import * as SvgIcons from 'stories/svg';

const IconButton = Button.Icon;

const stories = storiesOf('General|Icon', module);

stories.add(
  'Basic',
  () => ({
    render() {
      return (
        <Demo title="Basic">
          <Icon icon="star" />
        </Demo>
      );
    },
  }),
  {
    notes: `
### Default
`,
  }
);

stories.add(
  'Spin',
  () => ({
    render() {
      return (
        <Demo title="Spin">
          <Icon style="margin-right: 5px" icon="spinner" spin />
          <Icon style="margin-right: 5px" icon="spinner" pulse />
          <Icon icon="cog" spin />
        </Demo>
      );
    },
  }),
  {
    notes: `
### Spin and Pulse
`,
  }
);

stories.add(
  'Rotate',
  () => ({
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
  }),
  {
    notes: `
### Rotate and flip
`,
  }
);

stories.add(
  'Size',
  () => ({
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
  }),
  {
    notes: `
### Size
`,
  }
);

stories.add(
  'Custom',
  () => ({
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
  }),
  {
    notes: `
### Custom Icon

Custom Icon to render an externally-introduced SVG file.


You also need to configure SVG loader in webpack to use [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

\`\`\`js
{
  test: /\\.svg$/,
  use: [{
    loader: 'svg-sprite-loader',
    options: {
      symbolId: 'icon-[name]'
    }
  }]
}
\`\`\`
`,
  }
);

stories.add(
  'custom-svg',
  () => ({
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
  }),
  {
    notes: `
### Svg icon color

If you need the svg icon color to match the text color, you can use [currentColor](https://caniuse.com/#search=currentColor) to ensure that your \`fill\`,\`strocke\` colors match the font color.If you used [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader), you should set \`currentColor\` for \`use\` element.
`,
  }
);
