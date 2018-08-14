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
