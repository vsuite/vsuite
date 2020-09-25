import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|LoadingBar', module);

stories.add('default', () => ({
  render() {
    this.$Loading.destroy();
    this.$Loading.config({ progress: false });

    return (
      <Demo title="Default">
        <Button.Group>
          <Button onClick={() => this.$Loading.start()}>开始加载</Button>
          <Button onClick={() => this.$Loading.finish()}>加载完毕</Button>
          <Button onClick={() => this.$Loading.error()}>加载失败</Button>
        </Button.Group>
      </Demo>
    );
  },
}));

stories.add('progress', () => ({
  render() {
    this.$Loading.destroy();
    this.$Loading.config({ progress: true });

    return (
      <Demo title="Progress">
        <Button.Group>
          <Button onClick={() => this.$Loading.start()}>开始加载</Button>
          <Button onClick={() => this.$Loading.finish()}>加载完毕</Button>
          <Button onClick={() => this.$Loading.error()}>加载失败</Button>
        </Button.Group>
      </Demo>
    );
  },
}));
