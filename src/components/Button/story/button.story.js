import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const ButtonToolbar = Button.Toolbar;

const stories = storiesOf('General|Button', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Button>Default</Button>
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <ButtonToolbar>
          <Button appearance="default">Default</Button>
          <Button appearance="primary">Primary</Button>
          <Button appearance="link" href="#">
            Link
          </Button>
          <Button appearance="subtle">Subtle</Button>
          <Button appearance="ghost">Ghost</Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));
