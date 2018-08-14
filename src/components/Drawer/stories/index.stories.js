import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import { Paragraph } from 'stories/content';
import Drawer from 'components/Drawer';
import Button from 'components/Button';

const stories = storiesOf('General|Drawer', module);

stories.add('default', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render(h) {
    return (
      <Demo title="Default">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Drawer
          title="Drawer Title"
          visible={this.visible}
          onChange={v => (this.visible = v)}
        >
          <Paragraph />
        </Drawer>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = true;
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

        <Drawer
          visible={this.visible}
          title="Drawer Title"
          backdrop={this.backdrop}
          onChange={v => (this.visible = v)}
        >
          <Paragraph />
        </Drawer>
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

stories.add('placement', () => ({
  data() {
    return {
      visible: false,
      placement: 'right',
    };
  },

  render(h) {
    return (
      <Demo title="Placement">
        <Button.Toolbar>
          <Button.Icon
            icon="angle-left"
            onClick={() => this._handleOpen('left')}
          >
            Left
          </Button.Icon>
          <Button.Icon
            icon="angle-right"
            onClick={() => this._handleOpen('right')}
          >
            Right
          </Button.Icon>
          <Button.Icon icon="angle-up" onClick={() => this._handleOpen('top')}>
            Top
          </Button.Icon>
          <Button.Icon
            icon="angle-down"
            onClick={() => this._handleOpen('bottom')}
          >
            Bottom
          </Button.Icon>
        </Button.Toolbar>

        <Drawer
          visible={this.visible}
          title="Drawer Title"
          placement={this.placement}
          onChange={v => (this.visible = v)}
        >
          <Paragraph />
        </Drawer>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement) {
      this.visible = !this.visible;
      this.placement = placement;
    },
  },
}));

stories.add('size', () => ({
  data() {
    return {
      visible: false,
      placement: 'right',
      size: 'sm',
    };
  },

  render() {
    return (
      <Demo title="Size">
        <Button.Toolbar>
          <Button.Icon
            icon="angle-left"
            onClick={() => this._handleOpen('left', 'lg')}
          >
            Large Left
          </Button.Icon>
          <Button.Icon
            icon="angle-right"
            onClick={() => this._handleOpen('right', 'lg')}
          >
            Large Right
          </Button.Icon>
          <Button.Icon
            icon="angle-up"
            onClick={() => this._handleOpen('top', 'lg')}
          >
            Large Top
          </Button.Icon>
          <Button.Icon
            icon="angle-down"
            onClick={() => this._handleOpen('bottom', 'lg')}
          >
            Large Bottom
          </Button.Icon>
        </Button.Toolbar>

        <Button.Toolbar>
          <Button.Icon
            icon="angle-left"
            onClick={() => this._handleOpen('left', 'md')}
          >
            Medium Left
          </Button.Icon>
          <Button.Icon
            icon="angle-right"
            onClick={() => this._handleOpen('right', 'md')}
          >
            Medium Right
          </Button.Icon>
          <Button.Icon
            icon="angle-up"
            onClick={() => this._handleOpen('top', 'md')}
          >
            Medium Top
          </Button.Icon>
          <Button.Icon
            icon="angle-down"
            onClick={() => this._handleOpen('bottom', 'md')}
          >
            Medium Bottom
          </Button.Icon>
        </Button.Toolbar>

        <Button.Toolbar>
          <Button.Icon
            icon="angle-left"
            onClick={() => this._handleOpen('left', 'sm')}
          >
            Small Left
          </Button.Icon>
          <Button.Icon
            icon="angle-right"
            onClick={() => this._handleOpen('right', 'sm')}
          >
            Small Right
          </Button.Icon>
          <Button.Icon
            icon="angle-up"
            onClick={() => this._handleOpen('top', 'sm')}
          >
            Small Top
          </Button.Icon>
          <Button.Icon
            icon="angle-down"
            onClick={() => this._handleOpen('bottom', 'sm')}
          >
            Small Bottom
          </Button.Icon>
        </Button.Toolbar>

        <Button.Toolbar>
          <Button.Icon
            icon="angle-left"
            onClick={() => this._handleOpen('left', 'xs')}
          >
            XSmall Left
          </Button.Icon>
          <Button.Icon
            icon="angle-right"
            onClick={() => this._handleOpen('right', 'xs')}
          >
            XSmall Right
          </Button.Icon>
          <Button.Icon
            icon="angle-up"
            onClick={() => this._handleOpen('top', 'xs')}
          >
            XSmall Top
          </Button.Icon>
          <Button.Icon
            icon="angle-down"
            onClick={() => this._handleOpen('bottom', 'xs')}
          >
            XSmall Bottom
          </Button.Icon>
        </Button.Toolbar>

        <Drawer
          visible={this.visible}
          title="Drawer Title"
          placement={this.placement}
          size={this.size}
          onChange={v => (this.visible = v)}
        >
          <Paragraph />
        </Drawer>
      </Demo>
    );
  },

  methods: {
    _handleOpen(placement, size) {
      this.visible = !this.visible;
      this.placement = placement;
      this.size = size;
    },
  },
}));
