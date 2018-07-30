import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import Demo from 'stories/demo';
import Tooltip from 'components/Tooltip';

const stories = storiesOf('General|Tooltip', module);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <div style="position: relative; height: 20px;">
          <Tooltip
            visible
            onMouseEnter={action('mouse-enter')}
            onMouseLeave={action('mouse-leave')}
          >
            This is a <i>tooltip</i> .
          </Tooltip>
        </div>
      </Demo>
    );
  },
}));
