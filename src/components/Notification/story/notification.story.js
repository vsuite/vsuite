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
      this.$Notification.open({
        title: 'Notify',
        description: h => <Paragraph style={{ width: '320px' }} size="small" />,
      });
    },
  },
}));
