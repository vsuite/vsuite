import { storiesOf } from '@storybook/vue';

import Popover from 'components/Popover';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Popover', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Popover title="This is a tooltip.">
          <Button>click</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      </Demo>
    );
  },
}));

stories.add('position', () => ({
  render() {
    return (
      <Demo title="Position">
        <Popover style={{ margin: '10px' }} title="This is a tooltip.">
          <Button>Normal</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
        <br />

        <Popover
          style={{ margin: '10px' }}
          title="This is a tooltip."
          positionLeft={10}
        >
          <Button>positionLeft = 10</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>

        <br />

        <Popover
          style={{ margin: '10px' }}
          title="This is a tooltip."
          positionTop={10}
        >
          <Button>positionTop = 10</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
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
          <Popover
            style={{ margin: '10px' }}
            inline
            placement={placement}
            title="This is a tooltip."
          >
            <template slot="content">
              <p>This is a default Popover </p>
              <p>Content</p>
            </template>
          </Popover>
        ))}
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  render(h) {
    return (
      <Demo title="Placement">
        <table class="placement-table" cellSpacing={5}>
          <tbody>
            <tr>
              <td />
              <td>{this._renderPopover(h, 'bottom-start')}</td>
              <td>{this._renderPopover(h, 'bottom')}</td>
              <td>{this._renderPopover(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderPopover(h, 'right-start')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderPopover(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderPopover(h, 'right')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderPopover(h, 'left')}</td>
            </tr>

            <tr>
              <td>{this._renderPopover(h, 'right-end')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderPopover(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderPopover(h, 'top-start')}</td>
              <td>{this._renderPopover(h, 'top')}</td>
              <td>{this._renderPopover(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>

        <hr />

        {this._renderPopover(h, 'auto')}
        <br />
        {this._renderPopover(h, 'auto-start')}
        <br />
        {this._renderPopover(h, 'auto-end')}
      </Demo>
    );
  },

  methods: {
    _renderPopover(h, placement) {
      return (
        <Popover
          style={{ margin: '10px' }}
          placement={placement}
          title="This is a tooltip."
        >
          <Button>{placement}</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      );
    },
  },
}));

stories.add('trigger', () => ({
  render(h) {
    return (
      <Demo title="Trigger">
        <Button.Toolbar>
          {this._renderPopover(h, 'click')}
          {this._renderPopover(h, 'right-click')}
          {this._renderPopover(h, 'hover')}
          {this._renderPopover(h, 'focus')}
          {this._renderPopover(h, 'active')}
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _renderPopover(h, trigger) {
      return (
        <Popover trigger={trigger} title="Title">
          <Button>{trigger}</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      );
    },
  },
}));

stories.add('full', () => ({
  render() {
    return (
      <Demo title="Full">
        <Popover full title="This is a tooltip.">
          <Button>click</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      </Demo>
    );
  },
}));

stories.add('always', () => ({
  render() {
    return (
      <Demo title="Always">
        <Popover visible title="This is a tooltip.">
          <Button>always</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      </Demo>
    );
  },
}));

stories.add('delay', () => ({
  render() {
    return (
      <Demo title="Delay">
        <Popover delay={1000} title="This is a tooltip.">
          <Button>hover delay 1s</Button>
          <template slot="content">
            <p>This is a default Popover </p>
            <p>Content</p>
          </template>
        </Popover>
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
            <Popover visible title="This is a tooltip.">
              <Button>click</Button>
              <template slot="content">
                <p>This is a default Popover </p>
                <p>Content</p>
              </template>
            </Popover>
          </div>
        </div>
      </Demo>
    );
  },
}));
