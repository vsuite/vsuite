import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Demo from 'stories/demo';
import { Paragraph } from 'stories/content';

const stories = storiesOf('General|Modal', module);

stories.add('basic', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Basic">
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
      overflow: false,
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Overflow">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen(false)}>
            Overflow = false
          </Button>

          <Button onClick={() => this._handleOpen(true)}>
            Overflow = true
          </Button>
        </Button.Toolbar>

        <Modal
          overflow={this.overflow}
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
    _handleOpen(overflow) {
      this.overflow = overflow;
      this.visible = !this.visible;
    },
  },
}));

stories.add('visible', () => ({
  render() {
    return (
      <Demo title="Visible">
        <Modal visible={true} title="Modal Title">
          <Paragraph size="small" />
        </Modal>
      </Demo>
    );
  },
}));

stories.add('dynamic', () => ({
  data() {
    return {
      loading: true,
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Dynamic">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Modal
          visible={this.visible}
          title="Modal Title"
          onChange={v => (this.visible = v)}
        >
          {this.loading ? (
            <div style={{ textAlign: 'center' }}>
              <Loader size="md" />
            </div>
          ) : (
            <Paragraph size="small" />
          )}
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = !this.visible;
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
}));

stories.add('loading', () => ({
  data() {
    return { visible: false, loading: false };
  },

  render() {
    return (
      <Demo title="Loading">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Modal
          visible={this.visible}
          loading={this.loading}
          title="Modal Title"
          onChange={v => (this.visible = v)}
          onOk={this._handleOk}
        >
          <Paragraph size="small" />
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = !this.visible;
      this.loading = true;
    },

    _handleOk() {
      setTimeout(() => {
        this.loading = false;
        this.visible = false;
      }, 2000);
    },
  },
}));
