import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import { Fade, Collapse } from 'components/Animation';
import Button from 'components/Button';

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
