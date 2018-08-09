import { storiesOf } from '@storybook/vue';
// import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import Demo from 'stories/demo';
import Tooltip from 'components/Tooltip';
import Button from 'components/Button';

const stories = storiesOf('General|Tooltip', module);

stories.addDecorator(withKnobs);

const TRIGGER = 'focus';

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <div style="position: relative; height: 20px;">
          <Tooltip
            placement="bottom-start"
            trigger={TRIGGER}
            title="This is a tooltip, triggered by ClickThis is a tooltip, triggered by Click"
          >
            <Button>{TRIGGER}</Button>
          </Tooltip>

          <Tooltip
            placement="bottom"
            trigger={TRIGGER}
            title="This is a tooltip, triggered by ClickThis is a tooltip, triggered by Click"
            theme="light"
            always
          >
            <Button>{TRIGGER}</Button>
          </Tooltip>

          <Tooltip
            placement="top-end"
            trigger={TRIGGER}
            title="This is a tooltip, triggered by Click"
          >
            <Button>{TRIGGER}</Button>
          </Tooltip>
        </div>
      </Demo>
    );
  },
}));
