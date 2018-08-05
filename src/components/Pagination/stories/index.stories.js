import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

const stories = storiesOf('Navigation|Pagination', module);

stories.add('default', () => ({
  render: h => {
    return <Demo title="Default" />;
  },
}));
