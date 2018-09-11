import { storiesOf } from '@storybook/vue';

import DateRangePicker from 'components/DateRangePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Date Entry|DateRangePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <DateRangePicker style={{ width: '500px' }} />
      </Demo>
    );
  },
}));
