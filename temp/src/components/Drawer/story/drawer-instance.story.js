import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Drawer.$Drawer', module);

stories.add('status', () => ({
  render() {
    return (
      <Demo title="Status">
        <Button.Toolbar>
          <Button onClick={() => this._handleOpen('info')}>Info</Button>
          <Button onClick={() => this._handleOpen('warn')}>Warn</Button>
          <Button onClick={() => this._handleOpen('error')}>Error</Button>
          <Button onClick={() => this._handleOpen('success')}>Sccess</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleOpen(funcName) {
      this.$Drawer[funcName]({
        title: 'Title',
        content: h => [<p>Content of dialog</p>, <p>Content of dialog</p>],
      });
    },
  },
}));

stories.add('confirm', () => ({
  render() {
    return (
      <Demo title="Confirm">
        <Button.Toolbar>
          <Button onClick={this._handleBasic}>Basic</Button>
          <Button onClick={this._handleText}>Custom Text</Button>
          <Button onClick={this._handleAsync}>Async Close</Button>
        </Button.Toolbar>
      </Demo>
    );
  },

  methods: {
    _handleBasic() {
      this.$Drawer.confirm({
        title: 'Title',
        content: h => [<p>Content of dialog</p>, <p>Content of dialog</p>],
        onOk: () => {
          this.$Alert.info('Clicked ok');
        },
        onCancel: () => {
          this.$Alert.info('Clicked cancel');
        },
      });
    },
    _handleText() {
      this.$Drawer.confirm({
        title: 'Title',
        content: h => [<p>Content of dialog</p>, <p>Content of dialog</p>],
        okText: 'ok',
        cancelText: 'cancel',
      });
    },
    _handleAsync() {
      this.$Drawer.confirm({
        title: 'Title',
        content: h => <p>The dialog box will be closed after 2 seconds</p>,
        loading: true,
        onOk: () => {
          setTimeout(() => this.$Drawer.remove(), 2000);
        },
      });
    },
  },
}));
