import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Popover from 'components/Popover';
import Button from 'components/Button';

const stories = storiesOf('General|Popover', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Popover title="This is a tooltip.">
          <Button>Default</Button>
          <template slot="content">
            <p>This is a defalut Popover </p>
            <p>Content</p>
          </template>
        </Popover>
      </Demo>
    );
  },
}));
