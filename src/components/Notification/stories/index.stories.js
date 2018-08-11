import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import { Paragraph } from 'stories/content';
import Button from 'components/Button';

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
        duration: null,
        title: 'Notify',
        description: h => <Paragraph style={{ width: '320px' }} size="small" />,
      });
    },
  },
}));
