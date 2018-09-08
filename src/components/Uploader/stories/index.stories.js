import { storiesOf } from '@storybook/vue';

import Uploader from 'components/Uploader';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Uploader', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Uploader
          shouldQueueUpdate={(nextFileList, file) => {
            // console.log(nextFileList, file);

            if (file[0].name === 'IMG93.jpeg') {
              return false;
            }

            return true;
          }}
          onChange={value => {
            // console.log(value, '0000');
          }}
          action="//jsonplaceholder.typicode.com/posts/"
        />
      </Demo>
    );
  },
}));
