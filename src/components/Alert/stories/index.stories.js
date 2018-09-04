import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Alert', module);

stories.add('default', () => ({
  render(h) {
    return (
      <Demo title="Default">
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
      this.$Alert[type](`This is a ${type} message.`);
    },
  },
}));
