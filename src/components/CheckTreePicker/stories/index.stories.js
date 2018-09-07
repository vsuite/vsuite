import { storiesOf } from '@storybook/vue';
import data from 'stories/data/city';

import CheckTreePicker from 'components/CheckTreePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|CheckTreePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <CheckTreePicker style={{ width: '272px' }} data={data} />
      </Demo>
    );
  },
}));
