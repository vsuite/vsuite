import { storiesOf } from '@storybook/vue';
import data from 'stories/data/city';

import TreePicker from 'components/TreePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|TreePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <TreePicker style={{ width: '246px' }} defaultExpandAll data={data} />
      </Demo>
    );
  },
}));
