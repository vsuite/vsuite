import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Tooltip from 'components/Tooltip';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Tooltip', module);

stories.addDecorator(withKnobs);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Tooltip
          style={{ margin: '10px' }}
          trigger="click"
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>Click Me</Button>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('position', () => ({
  render() {
    return (
      <Demo title="Position">
        <Tooltip
          style={{ margin: '10px' }}
          trigger="click"
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>Normal</Button>
        </Tooltip>

        <br />

        <Tooltip
          style={{ margin: '10px' }}
          trigger="click"
          positionLeft={10}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>positionLeft = 10</Button>
        </Tooltip>

        <br />

        <Tooltip
          style={{ margin: '10px' }}
          trigger="click"
          positionTop={10}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>positionTop = 10</Button>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('inline', () => ({
  render() {
    const placements = [
      'auto',
      'auto-start',
      'auto-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
    ];

    return (
      <Demo title="Inline">
        {placements.map(placement => (
          <Tooltip
            inline
            style={{ margin: '10px' }}
            placement={placement}
            title="This is a ToolTip for simple text hints. It can replace the title property"
          />
        ))}
      </Demo>
    );
  },
}));

stories.add('theme', () => ({
  render() {
    const placements = [
      'auto',
      'auto-start',
      'auto-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
    ];

    return (
      <Demo title="Default">
        {placements.map(placement => (
          <Tooltip
            inline
            white
            style={{ margin: '10px' }}
            placement={placement}
            title="This is a ToolTip for simple text hints. It can replace the title property"
          />
        ))}
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  props: {
    white: {
      type: Boolean,
      default: boolean('White', false),
    },
  },

  render(h) {
    return (
      <Demo title="Placement">
        <table class="placement-table" cellSpacing={5}>
          <tbody>
            <tr>
              <td />
              <td>{this._renderTooltip(h, 'bottom-start')}</td>
              <td>{this._renderTooltip(h, 'bottom')}</td>
              <td>{this._renderTooltip(h, 'bottom-end')}</td>
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
              <td>{this._renderTooltip(h, 'top-start')}</td>
              <td>{this._renderTooltip(h, 'top')}</td>
              <td>{this._renderTooltip(h, 'top-end')}</td>
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

  methods: {
    _renderTooltip(h, placement) {
      return (
        <Tooltip
          style={{ margin: '10px' }}
          trigger="click"
          placement={placement}
          white={this.white}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>{placement}</Button>
        </Tooltip>
      );
    },
  },
}));

stories.add('trigger', () => ({
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
}));

stories.add('always', () => ({
  render() {
    return (
      <Demo title="Always">
        <Tooltip
          visible
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>always</Button>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('delay', () => ({
  render() {
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

stories.add('container', () => ({
  render() {
    return (
      <Demo title="Container">
        <div
          style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            background: '#f1f1f1',
            boxShadow: '#999 1px 1px 5px inset',
            padding: '50px',
          }}
        >
          <div style={{ height: '500px' }}>
            <Tooltip
              visible
              white
              style={{ margin: '10px' }}
              trigger="click"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>Click Me</Button>
            </Tooltip>
          </div>
        </div>
      </Demo>
    );
  },
}));
