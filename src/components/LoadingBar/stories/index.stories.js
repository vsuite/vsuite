import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import LoadingBar from 'components/LoadingBar';
import Demo from 'stories/demo';

const stories = storiesOf('General|LoadingBar', module);

stories.add('default', () => ({
  render: h => {
    LoadingBar.destroy();
    LoadingBar.config({ progress: true });

    return (
      <Demo title="Default">
        <ButtonGroup>
          <Button onClick={() => LoadingBar.start()}>开始加载</Button>
          <Button onClick={() => LoadingBar.finish()}>加载完毕</Button>
          <Button onClick={() => LoadingBar.error()}>加载失败</Button>
        </ButtonGroup>
      </Demo>
    );
  },
}));

stories.add('progress', () => ({
  render: h => {
    LoadingBar.destroy();
    LoadingBar.config({ progress: false });

    return (
      <Demo title="Progress" description="Disable progress">
        <ButtonGroup>
          <Button onClick={() => LoadingBar.start()}>开始加载</Button>
          <Button onClick={() => LoadingBar.finish()}>加载完毕</Button>
          <Button onClick={() => LoadingBar.error()}>加载失败</Button>
        </ButtonGroup>
      </Demo>
    );
  },
}));
