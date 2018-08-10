import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import Demo from 'stories/demo';
import Tooltip from 'components/Tooltip';
import Button from 'components/Button';

const stories = storiesOf('General|Tooltip', module);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Tooltip title="This is a tooltip.">
          <Button>Default</Button>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  methods: {
    _renderTooltip(h, placement) {
      return (
        <Tooltip
          style={{ margin: '10px' }}
          placement={placement}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>{placement}</Button>
        </Tooltip>
      );
    },
  },

  render(h) {
    return (
      <Demo title="Placement">
        <table className="placement-table" cellSpacing={5}>
          <tbody>
            <tr>
              <td />
              <td>{this._renderTooltip(h, 'top-start')}</td>
              <td>{this._renderTooltip(h, 'top')}</td>
              <td>{this._renderTooltip(h, 'top-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderTooltip(h, 'right-start')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderTooltip(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderTooltip(h, 'right')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderTooltip(h, 'left')}</td>
            </tr>

            <tr>
              <td>{this._renderTooltip(h, 'right-end')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderTooltip(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderTooltip(h, 'bottom-start')}</td>
              <td>{this._renderTooltip(h, 'bottom')}</td>
              <td>{this._renderTooltip(h, 'bottom-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>

        <hr />

        {this._renderTooltip(h, 'auto')}
        <br />
        {this._renderTooltip(h, 'auto-start')}
        <br />
        {this._renderTooltip(h, 'auto-end')}
      </Demo>
    );
  },
}));

stories.add('trigger', () => ({
  methods: {
    _renderTooltip(h, trigger) {
      return (
        <Tooltip
          trigger={trigger}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>{trigger}</Button>
        </Tooltip>
      );
    },
  },

  render(h) {
    return (
      <Demo title="Trigger">
        <Button.Toolbar>
          {this._renderTooltip(h, 'click')}
          {this._renderTooltip(h, 'right-click')}
          {this._renderTooltip(h, 'hover')}
          {this._renderTooltip(h, 'focus')}
          {this._renderTooltip(h, 'active')}
        </Button.Toolbar>
      </Demo>
    );
  },
}));

stories.add('always', () => ({
  data() {
    return {
      visible: true,
    };
  },

  render(h) {
    return (
      <Demo title="Always">
        <Tooltip
          visible={this.visible}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>always</Button>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('delay', () => ({
  render(h) {
    return (
      <Demo title="Delay">
        <Tooltip
          delay={1000}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>hover delay 1s</Button>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('theme', () => ({
  methods: {
    _renderTooltip(h, theme) {
      return (
        <Tooltip
          theme={theme}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>{theme}</Button>
        </Tooltip>
      );
    },
  },

  render(h) {
    return (
      <Demo title="Theme">
        <Button.Toolbar>
          {this._renderTooltip(h, 'dark')}
          {this._renderTooltip(h, 'light')}
        </Button.Toolbar>
      </Demo>
    );
  },
}));
