import { storiesOf } from '@storybook/vue';

import Table from 'components/Table';
import Demo from 'stories/demo';

const stories = storiesOf('Data Display|Table', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Table />
      </Demo>
    );
  },
}));
