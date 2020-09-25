import { storiesOf } from '@storybook/vue';
import data from 'stories/data/city';

import CheckTree from 'components/CheckTree';
import Demo from 'stories/demo';

const stories = storiesOf('Data Display|CheckTree', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <CheckTree data={data} />
      </Demo>
    );
  },
}));

stories.add('cascade', () => ({
  render() {
    return (
      <Demo title="Cascade">
        <CheckTree data={data} />
        <hr />
        <p>Not allow cascade</p>
        <CheckTree cascade={false} data={data} />
      </Demo>
    );
  },
}));
