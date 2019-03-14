import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const ButtonGroup = Button.Group;
const ButtonToolbar = Button.Toolbar;

const stories = storiesOf('General|Button.Group', module);

stories.add(
  'Basic',
  () => ({
    render() {
      const appearances = ['primary', 'link', 'subtle', 'ghost'];

      return (
        <Demo title="Basic">
          {appearances.map(appearance => (
            <ButtonToolbar key={appearance}>
              <ButtonGroup>
                <Button appearance={appearance}>Left</Button>
                <Button appearance={appearance}>Center</Button>
                <Button appearance={appearance}>Right</Button>
              </ButtonGroup>
            </ButtonToolbar>
          ))}
        </Demo>
      );
    },
  }),
  {
    notes: `
### Basic`,
  }
);

stories.add(
  'Vertical',
  () => ({
    render() {
      const appearances = ['primary', 'link', 'subtle', 'ghost'];

      return (
        <Demo title="Vertical">
          {appearances.map(appearance => (
            <ButtonToolbar key={appearance} vertical>
              <ButtonGroup>
                <Button appearance={appearance}>Top</Button>
                <Button appearance={appearance}>Middle</Button>
                <Button appearance={appearance}>Bottom</Button>
              </ButtonGroup>
            </ButtonToolbar>
          ))}
        </Demo>
      );
    },
  }),
  {
    notes: `
### Vertical
`,
  }
);

stories.add(
  'Justified',
  () => ({
    render() {
      const appearances = ['primary', 'link', 'subtle', 'ghost'];

      return (
        <Demo title="Justified">
          {appearances.map(appearance => (
            <ButtonToolbar
              key={appearance}
              style={{ marginTop: '12px' }}
              justified
            >
              <ButtonGroup>
                <Button appearance={appearance}>Top</Button>
                <Button appearance={appearance}>Middle</Button>
                <Button appearance={appearance}>Bottom</Button>
              </ButtonGroup>
            </ButtonToolbar>
          ))}
        </Demo>
      );
    },
  }),
  {
    notes: `
### Justified
`,
  }
);
