import { storiesOf } from '@storybook/vue';
import data from 'stories/data/city';

import Tree from 'components/Tree';
import Demo from 'stories/demo';

const stories = storiesOf('Data Display|Tree', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Tree data={data} />
      </Demo>
    );
  },
}));

stories.add('leaf', () => ({
  render() {
    return (
      <Demo title="Leaf">
        <Tree leaf data={data} />
      </Demo>
    );
  },
}));
