import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import { Fade, Collapse, Bounce, Slide } from 'components/Animation';
import Demo from 'stories/demo';

const stories = storiesOf('Utils|Animation', module);

stories.add('fade', () => ({
  data() {
    return { show: true };
  },

  render() {
    return (
      <Demo title="Fade">
        <Button onClick={() => (this.show = !this.show)}>toggle</Button>
        <hr />
        <Fade>
          {this.show ? (
            <div
              style={{
                background: '#000',
                width: '100px',
                height: '160px',
                overflow: 'hidden',
              }}
            >
              <p>Panel</p>
              <p>Content Content Content</p>
            </div>
          ) : null}
        </Fade>
      </Demo>
    );
  },
}));

stories.add('collapse', () => ({
  data() {
    return { show: true };
  },

  render() {
    return (
      <Demo title="Collapse">
        <Button onClick={() => (this.show = !this.show)}>toggle</Button>
        <hr />
        <Collapse>
          {this.show ? (
            <div
              style={{
                background: '#000',
                width: '100px',
                height: '160px',
                overflow: 'hidden',
              }}
            >
              <p>Panel</p>
              <p>Content Content Content</p>
            </div>
          ) : null}
        </Collapse>
      </Demo>
    );
  },
}));

stories.add('bounce', () => ({
  data() {
    return { show: true };
  },

  render() {
    return (
      <Demo title="Bounce">
        <Button onClick={() => (this.show = !this.show)}>toggle</Button>
        <hr />
        <Bounce>
          {this.show ? (
            <div
              style={{
                background: '#000',
                width: '100px',
                height: '160px',
                overflow: 'hidden',
              }}
            >
              <p>Panel</p>
              <p>Content Content Content</p>
            </div>
          ) : null}
        </Bounce>
      </Demo>
    );
  },
}));

stories.add('slide', () => ({
  data() {
    return { show: true, placement: 'right' };
  },

  render() {
    return (
      <Demo title="Slide">
        <Button.Toolbar>
          <Button onClick={() => this._handleToggle('left')}>Slide Left</Button>
          <Button onClick={() => this._handleToggle('right')}>
            Slide Right
          </Button>
          <Button onClick={() => this._handleToggle('top')}>Slide Top</Button>
          <Button onClick={() => this._handleToggle('bottom')}>
            Slide Bottom
          </Button>
        </Button.Toolbar>
        <hr />
        <Slide placement={this.placement}>
          {this.show ? (
            <div
              style={{
                background: '#000',
                width: '100px',
                height: '160px',
                overflow: 'hidden',
              }}
            >
              <p>Panel</p>
              <p>Content Content Content</p>
            </div>
          ) : null}
        </Slide>
      </Demo>
    );
  },

  methods: {
    _handleToggle(placement) {
      this.show = !this.show;
      this.placement = placement;
    },
  },
}));
