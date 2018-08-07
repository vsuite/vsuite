import { storiesOf } from '@storybook/vue';
// import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import Demo from 'stories/demo';
import Tooltip from 'components/Tooltip';
import Button from 'components/Button';

const stories = storiesOf('General|Tooltip', module);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <div style="position: relative; height: 20px;">
          <Tooltip
            placement="bottom-start"
            trigger="click"
            title="This is a tooltip, triggered by Click"
          >
            <Button>Click</Button>
          </Tooltip>

          <Tooltip
            placement="bottom"
            trigger="click"
            title="This is a tooltip, triggered by Click"
          >
            <Button>Click</Button>
          </Tooltip>

          <Tooltip
            placement="bottom-end"
            trigger="click"
            title="This is a tooltip, triggered by Click"
          >
            <Button>Click</Button>
          </Tooltip>
        </div>
      </Demo>
    );
  },
}));
