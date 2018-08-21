import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import AutoComplete from 'components/AutoComplete';

const stories = storiesOf('Data Entry|AutoComplete', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <AutoComplete
          data={[
            'HYPER Advertiser',
            'HYPER Web Analytics',
            'HYPER Video Analytics',
            'HYPER DMP',
            'HYPER Ad Serving',
            'HYPER Data Discovery',
          ]}
        />
      </Demo>
    );
  },
}));
