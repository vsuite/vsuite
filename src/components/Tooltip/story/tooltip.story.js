import { storiesOf } from '@storybook/vue';

import Tooltip from 'components/Tooltip';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Tooltip', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Tooltip inline>
          <template slot="title">
            This is a <i>tooltip</i> .
          </template>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  render() {
    const placements = [
      'auto',
      'bottom',
      'bottom-start',
      'bottom-end',
      'top',
      'top-start',
      'top-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    return (
      <Demo title="Placement">
        {placements.map(placement => (
          <div style={{ marginBottom: '10px' }}>
            <Tooltip
              trigger="click"
              title="This is a ToolTip for simple text hints. It can replace the title property."
            >
              <Button appearance="subtle">{placement}</Button>
            </Tooltip>
          </div>
        ))}
      </Demo>
    );
  },
}));
