import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Alert', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
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
      this.$Alert[type](`This is a ${type} message.`);
    },
  },
}));

stories.add('closeable', () => ({
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
      this.$Alert[type](`This is a ${type} message.`, { closable: true });
    },
  },
}));

stories.add('duration', () => ({
  render() {
    return (
      <Demo title="Duration">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen(10000)}>duration 10s</Button>
          <Button onClick={() => this._handleOpenNoLimit()}>no limit</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(duration) {
      this.$Alert.success(
        `This is message will be closed after ${duration / 1000}s.`,
        duration,
        { closable: true }
      );
    },

    _handleOpenNoLimit() {
      this.$Alert.open(
        'This is message will not be closed  automatically.',
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
          <Button onClick={() => this._handleOpen()}>show loading</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.$Alert.loading('This is a loading message.', 5000);
    },
  },
}));

stories.add('placement', () => ({
  render() {
    return (
      <Demo title="Placement">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('top')}>top</Button>
          <Button onClick={() => this._handleOpen('bottom')}>bottom</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement) {
      this.$Alert.open(`This is a ${placement} message.`, { placement });
    },
  },
}));

stories.add('position', () => ({
  render() {
    return (
      <Demo title="Position">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('top', { top: 20 })}>
            top = 20px
          </Button>
          <Button onClick={() => this._handleOpen('bottom', { bottom: 20 })}>
            bottom = 20px
          </Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement, options) {
      this.$Alert.open(`This is a ${placement} message`, {
        key: placement,
        placement,
        ...options,
      });
    },
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen()}>custom alert</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      let instance = null;

      instance = this.$Alert.open(
        h => (
          <div>
            Some text <Button onClick={() => instance.remove()}>close</Button>
          </div>
        ),
        0
      );
    },
  },
}));
