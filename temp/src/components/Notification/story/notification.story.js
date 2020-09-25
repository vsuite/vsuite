import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';
import { Paragraph } from 'stories/content';

const stories = storiesOf('General|Notification', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.$Notification.open('Notify', h => (
        <Paragraph style={{ width: '320px' }} size="small" />
      ));
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
    _handleOpen(type) {
      this.$Notification[type](type, h => (
        <Paragraph style={{ width: '320px' }} size="small" />
      ));
    },
  },
}));

stories.add('closable', () => ({
  render() {
    return (
      <Demo title="Closable">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('open')}> Default </Button>
          <Button onClick={() => this._handleOpen('info')}> Info </Button>
          <Button onClick={() => this._handleOpen('success')}> Success </Button>
          <Button onClick={() => this._handleOpen('warning')}> Warning </Button>
          <Button onClick={() => this._handleOpen('error')}> Error </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(type) {
      this.$Notification[type](
        type,
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        { closable: true }
      );
    },
  },
}));

stories.add('duration', () => ({
  render() {
    return (
      <Demo title="Duration">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen(10000)}>duration 10s</Button>
          <Button onClick={() => this._handleOpenNoLimit()}> no limit </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(duration) {
      this.$Notification.open(
        'Delay 10s',
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        duration,
        { closable: true }
      );
    },
    _handleOpenNoLimit() {
      this.$Notification.open(
        'Always',
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        0,
        { closable: true }
      );
    },
  },
}));

stories.add('loading', () => ({
  render() {
    return (
      <Demo title="Loading">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('loading')}> Loading </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(type) {
      this.$Notification[type]('Notify', h => (
        <Paragraph style={{ width: '320px' }} size="small" />
      ));
    },
  },
}));

stories.add('placement', () => ({
  render() {
    return (
      <Demo title="Placement">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('topLeft')}>Top Left</Button>
          <Button onClick={() => this._handleOpen('topRight')}>
            Top Right
          </Button>
          <Button onClick={() => this._handleOpen('bottomLeft')}>
            Bottom Left
          </Button>
          <Button onClick={() => this._handleOpen('bottomRight')}>
            Bottom Right
          </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement) {
      this.$Notification.open(
        placement,
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        { placement }
      );
    },
  },
}));

stories.add('position', () => ({
  render() {
    return (
      <Demo title="Position">
        <Button.Toolbar>
          <Button
            onClick={() => this._handleOpen('topLeft', { top: 5, left: 5 })}
          >
            Top=5 Left=5
          </Button>
          <Button
            onClick={() => this._handleOpen('topRight', { top: 5, right: 5 })}
          >
            Top=5 Right=5
          </Button>
          <Button
            onClick={() =>
              this._handleOpen('bottomLeft', { bottom: 5, left: 5 })
            }
          >
            Bottom=5 Left=5
          </Button>
          <Button
            onClick={() =>
              this._handleOpen('bottomRight', { bottom: 5, right: 5 })
            }
          >
            Bottom=5 Right=5
          </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement, options) {
      this.$Notification.open(
        placement,
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        { placement, ...options }
      );
    },
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <Button onClick={this._handleOpen}>Open</Button>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      let instance = this.$Notification.open(
        'Message',
        h => (
          <div>
            <p>Simon wants to add you as a friend .</p>
            <Button.Toolbar>
              <Button onClick={() => instance.remove()}>Accept</Button>
              <Button onClick={() => instance.remove()}>Cancel</Button>
            </Button.Toolbar>
          </div>
        ),
        0
      );
    },
  },
}));
