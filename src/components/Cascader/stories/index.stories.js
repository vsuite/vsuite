import { storiesOf } from '@storybook/vue';
import data from 'stories/data/province';

import Cascader from 'components/Cascader';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Cascader', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Cascader
          style={{ width: '224px' }}
          labelKey="name"
          valueKey="name"
          data={data}
        />
      </Demo>
    );
  },
}));
