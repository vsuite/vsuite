import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Slider from 'components/Slider';

const stories = storiesOf('Data Entry|Slider', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Slider />
      </Demo>
    );
  },
}));
