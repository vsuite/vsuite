import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';
import { Paragraph } from 'stories/content';

const stories = storiesOf('General|Notification', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.$Notification.open({
        title: 'Notify',
        description: h => <Paragraph style={{ width: '320px' }} size="small" />,
      });
    },
  },
}));

stories.add('type', () => ({
  render() {
    return (
      <Demo title="Type">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('info')}> Info </Button>
          <Button onClick={() => this._handleOpen('success')}> Success </Button>
          <Button onClick={() => this._handleOpen('warning')}> Warning </Button>
          <Button onClick={() => this._handleOpen('error')}> Error </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(funcName) {
      this.$Notification[funcName]({
        title: funcName,
        description: h => <Paragraph style={{ width: '320px' }} size="small" />,
      });
    },
  },
}));

stories.add('placement', () => ({
  render() {
    return (
      <Demo title="Placement">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('topLeft')}>
            {' '}
            Top Left{' '}
          </Button>
          <Button onClick={() => this._handleOpen('topRight')}>
            {' '}
            Top Right{' '}
          </Button>
          <Button onClick={() => this._handleOpen('bottomLeft')}>
            {' '}
            Bottom Left{' '}
          </Button>
          <Button onClick={() => this._handleOpen('bottomRight')}>
            {' '}
            Bottom Right{' '}
          </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement) {
      this.$Notification.open({
        placement,
        title: placement,
        description: h => <Paragraph style={{ width: '320px' }} size="small" />,
      });
    },
  },
}));

stories.add('delay', () => ({
  render(h) {
    return (
      <Demo title="Delay">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}> Open </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.$Notification.open({
        title: 'Notify',
        duration: 20000,
        description: h => <Paragraph style={{ width: '320px' }} size="small" />,
      });
    },
  },
}));

stories.add('custom', () => ({
  render(h) {
    return (
      <Demo title="Custom">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}> Open </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.$Notification.open({
        title: 'Message',
        duration: 10000,
        description: h => (
          <div>
            <p>Simon wants to add you as a friend .</p>
            <Button.Toolbar>
              <Button>Accept</Button>
              <Button>Cancel</Button>
            </Button.Toolbar>
          </div>
        ),
      });
    },
  },
}));
