import { storiesOf } from '@storybook/vue';

import Uploader from 'components/Uploader';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Uploader', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Uploader action="//jsonplaceholder.typicode.com/posts/" />
      </Demo>
    );
  },
}));

stories.add('picture', () => ({
  render() {
    return (
      <Demo title="Picture">
        <Uploader type="picture" action="//jsonplaceholder.typicode.com/posts/">
          <button>
            <Icon icon="camera-retro" size="lg" />
          </button>
        </Uploader>
      </Demo>
    );
  },
}));

stories.add('picture-text', () => ({
  render() {
    return (
      <Demo title="Picture Text">
        <Uploader
          type="picture-text"
          action="//jsonplaceholder.typicode.com/posts/"
        />
      </Demo>
    );
  },
}));

stories.add('multiple', () => ({
  render() {
    return (
      <Demo title="Multiple">
        <Uploader multiple action="//jsonplaceholder.typicode.com/posts/" />
      </Demo>
    );
  },
}));

stories.add('default-file-list', () => ({
  render() {
    return (
      <Demo title="Default FileList">
        <Uploader
          defaultFileList={[
            {
              key: 1,
              name: 'file1.jpg',
              status: 'finish',
              progress: 100,
            },
            {
              key: 2,
              name: 'file2.jpg',
              status: 'finish',
              progress: 100,
            },
          ]}
          action="//jsonplaceholder.typicode.com/posts/"
        />
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <Uploader
          disabled
          disabledFileItem
          defaultFileList={[
            {
              key: 1,
              name: 'file1.jpg',
              status: 'finish',
              progress: 100,
            },
            {
              key: 2,
              name: 'file2.jpg',
              status: 'finish',
              progress: 100,
            },
          ]}
          action="//jsonplaceholder.typicode.com/posts/"
        />
      </Demo>
    );
  },
}));

stories.add('drag', () => ({
  render() {
    return (
      <Demo title="Drag">
        <Uploader
          drag
          type="picture"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <button>
            <Icon icon="cloud-upload" size="lg" />
          </button>
        </Uploader>
      </Demo>
    );
  },
}));

stories.add('paste', () => ({
  render() {
    return (
      <Demo title="Paste">
        <Uploader
          paste
          type="picture"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <div style={{ width: '200px', lineHeight: '66px' }}>
            <Icon icon="cloud-upload" size="lg" />
          </div>
        </Uploader>
      </Demo>
    );
  },
}));
