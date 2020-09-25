import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Demo from 'stories/demo';

const ButtonGroup = Button.Group;
const ButtonToolbar = Button.Toolbar;

const stories = storiesOf('General|Button.Group', module);

stories.add('basic', () => ({
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
}));

stories.add('size', () => ({
  render() {
    return (
      <Demo title="Size">
        <ButtonGroup size="lg">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>

        <ButtonGroup size="md">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>

        <ButtonGroup size="sm">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>

        <ButtonGroup size="xs">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Demo>
    );
  },
}));

stories.add('vertical', () => ({
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
}));

stories.add('justified', () => ({
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
}));
