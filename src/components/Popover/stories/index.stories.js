import { storiesOf } from '@storybook/vue';

import Popover from 'components/Popover';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Popover', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Popover title="This is a tooltip.">
          <Button>click</Button>
          <template slot="content">
            <p>This is a defalut Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      </Demo>
    );
  },
}));

stories.add('pure', () => ({
  render: h => {
    const placements = [
      'auto',
      'bottom',
      'bottom-start',
      'bottom-end',
      'top',
      'top-start',
      'top-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    return (
      <Demo title="Pure">
        {placements.map(placement => (
          <div style={{ marginBottom: '10px' }}>
            <Popover pure placement={placement} title="Title">
              <template slot="content">
                <p>This is a Popover </p>
                <p>{placement}</p>
              </template>
            </Popover>
          </div>
        ))}
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  methods: {
    _renderPopover(h, placement) {
      return (
        <Popover style={{ margin: '10px' }} placement={placement} title="Title">
          <Button>{placement}</Button>
          <template slot="content">
            <p>This is a Popover </p>
            <p>{placement}</p>
          </template>
        </Popover>
      );
    },
  },

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
}));

stories.add('trigger', () => ({
  methods: {
    _renderPopover(h, trigger) {
      return (
        <Popover trigger={trigger} title="Title">
          <Button>{trigger}</Button>
          <template slot="content">
            <p>This is a defalut Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      );
    },
  },

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
}));

stories.add('full', () => ({
  render: h => {
    return (
      <Demo title="Full">
        <Popover full title="This is a tooltip.">
          <Button>click</Button>
          <template slot="content">
            <p>This is a defalut Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      </Demo>
    );
  },
}));
