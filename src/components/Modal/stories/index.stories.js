import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import { Paragraph } from 'stories/content';
import Button from 'components/Button';
import Modal from 'components/Modal';

const stories = storiesOf('General|Modal', module);

stories.add('default', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Default">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Modal
          visible={this.visible}
          title="Modal Title"
          onChange={v => (this.visible = v)}
        >
          <Paragraph size="small" />
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = !this.visible;
    },
  },
}));

stories.add('backdrop', () => ({
  data() {
    return {
      visible: false,
      backdrop: true,
    };
  },

  render() {
    return (
      <Demo title="Backdrop">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen(true)}>true</Button>
          <Button onClick={() => this._handleOpen(false)}>false</Button>
          <Button onClick={() => this._handleOpen('static')}>static</Button>
        </Button.Toolbar>

        <Modal
          visible={this.visible}
          title="Modal Title"
          backdrop={this.backdrop}
          onChange={v => (this.visible = v)}
        >
          <Paragraph size="small" />
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen(backdrop) {
      this.visible = !this.visible;
      this.backdrop = backdrop;
    },
  },
}));

stories.add('size', () => ({
  data() {
    return {
      visible: false,
      size: 'sm',
    };
  },

  render() {
    return (
      <Demo title="Size">
        <Button.Toolbar>
          <Button size="xs" onClick={() => this._handleOpen('xs')}>
            Xsmall
          </Button>
          <Button size="sm" onClick={() => this._handleOpen('sm')}>
            Small
          </Button>
          <Button size="md" onClick={() => this._handleOpen('md')}>
            Medium
          </Button>
          <Button size="lg" onClick={() => this._handleOpen('lg')}>
            Large
          </Button>
        </Button.Toolbar>

        <Modal
          visible={this.visible}
          title="Modal Title"
          size={this.size}
          onChange={v => (this.visible = v)}
        >
          <Paragraph size="small" />
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen(size) {
      this.visible = !this.visible;
      this.size = size;
    },
  },
}));

stories.add('full', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Full">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Modal
          full
          visible={this.visible}
          title="Modal Title"
          onChange={v => (this.visible = v)}
        >
          <Paragraph size="small" />
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = !this.visible;
    },
  },
}));

stories.add('overflow', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Overflow">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Modal
          overflow
          visible={this.visible}
          title="Modal Title"
          onChange={v => (this.visible = v)}
        >
          <Paragraph height={2400} />
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = !this.visible;
    },
  },
}));
