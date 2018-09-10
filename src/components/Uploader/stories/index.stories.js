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
              name: 'file1.jpg',
              fileKey: 1,
            },
            {
              name: 'file2.jpg',
              fileKey: 2,
            },
          ]}
          action="//jsonplaceholder.typicode.com/posts/"
        />
      </Demo>
    );
  },
}));
