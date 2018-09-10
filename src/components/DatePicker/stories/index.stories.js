import { storiesOf } from '@storybook/vue';
import moment from 'moment';

import DatePicker from 'components/DatePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|DatePicker', module);

stories.add('default', () => ({
  data() {
    return {
      value: moment(),
    };
  },

  render() {
    return (
      <Demo title="Default">
        <DatePicker
          style={{ width: '280px' }}
          value={this.value}
          onChange={value => {
            // console.log('onChange');

            this.value = value;
          }}
        />
      </Demo>
    );
  },
}));
