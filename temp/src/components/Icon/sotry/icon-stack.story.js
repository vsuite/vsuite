import { storiesOf } from '@storybook/vue';

import Icon from 'components/Icon';
import Demo from 'stories/demo';

const IconStack = Icon.Stack;

const stories = storiesOf('General|Icon.Stack', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <IconStack size="lg">
          <Icon icon="square" stack="2x" />
          <Icon icon="terminal" stack="1x" inverse />
        </IconStack>
        <IconStack size="lg">
          <Icon icon="camera" stack="1x" />
          <Icon style="color: red" icon="ban" stack="2x" />
        </IconStack>
      </Demo>
    );
  },
}));
