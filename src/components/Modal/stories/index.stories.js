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
          <Button onClick={this._handleOpen}> Open</Button>
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
