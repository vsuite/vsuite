import { storiesOf } from '@storybook/vue';

import Button from 'components/Button';
import Icon from 'components/Icon';
import Demo from 'stories/demo';

const IconButton = Button.Icon;
const ButtonToolbar = Button.Toolbar;

const stories = storiesOf('General|Button', module);

stories.add('basic', () => ({
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

stories.add('size', () => ({
  render() {
    return (
      <Demo title="Default">
        <ButtonToolbar>
          <Button size="lg">Large</Button>
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
          <Button size="xs">Xsmall</Button>
        </ButtonToolbar>

        <ButtonToolbar>
          <IconButton icon="star" circle size="lg" />
          <IconButton icon="star" circle size="md" />
          <IconButton icon="star" circle size="sm" />
          <IconButton icon="star" circle size="xs" />
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('color', () => ({
  render() {
    return (
      <Demo title="Color">
        <ButtonToolbar>
          <Button color="red">Red</Button>
          <Button color="orange">Orange</Button>
          <Button color="yellow">Yellow</Button>
          <Button color="green">Green</Button>
          <Button color="cyan">Cyan</Button>
          <Button color="blue">Blue</Button>
          <Button color="violet">Violet</Button>
        </ButtonToolbar>

        <ButtonToolbar style="background: #000; padding: 10px;">
          <Button color="red" appearance="ghost">
            Red
          </Button>
          <Button color="orange" appearance="ghost">
            Orange
          </Button>
          <Button color="yellow" appearance="ghost">
            Yellow
          </Button>
          <Button color="green" appearance="ghost">
            Green
          </Button>
          <Button color="cyan" appearance="ghost">
            Cyan
          </Button>
          <Button color="blue" appearance="ghost">
            Blue
          </Button>
          <Button color="violet" appearance="ghost">
            Violet
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <ButtonToolbar>
          <Button color="blue">
            <Icon icon="facebook-official" />
            {' Facebook'}
          </Button>
          <Button color="red">
            <Icon icon="google-plus-circle" />
            {' Google Plus'}
          </Button>
          <Button color="cyan">
            <Icon icon="twitter" />
            {' Twitter'}
          </Button>
          <Button color="blue">
            <Icon icon="linkedin" />
            {' LinkedIn'}
          </Button>
          <Button color="green">
            <Icon icon="wechat" />
            {' WeChat'}
          </Button>
          <Button color="yellow">
            <Icon icon="weibo" />
            {' WeiBo'}
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <ButtonToolbar>
          <Button appearance="default" block>
            Block
          </Button>
          <Button appearance="primary" block>
            Block
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <ButtonToolbar>
          <Button appearance="default" disabled>
            Default
          </Button>
          <Button appearance="primary" disabled>
            Primary
          </Button>
          <Button appearance="link" disabled>
            Link
          </Button>
          <Button appearance="subtle" disabled>
            Subtle
          </Button>
          <Button appearance="ghost" disabled>
            Ghost
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('active', () => ({
  render() {
    return (
      <Demo title="Active">
        <ButtonToolbar>
          <Button appearance="default" active>
            Default
          </Button>
          <Button appearance="primary" active>
            Primary
          </Button>
          <Button appearance="link" active>
            Link
          </Button>
          <Button appearance="subtle" active>
            Subtle
          </Button>
          <Button appearance="ghost" active>
            Ghost
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('loading', () => ({
  render() {
    return (
      <Demo title="Loading">
        <ButtonToolbar>
          <Button appearance="default" loading>
            Default
          </Button>
          <Button appearance="primary" loading>
            Primary
          </Button>
          <Button appearance="link" loading>
            Link
          </Button>
          <Button appearance="subtle" loading>
            Subtle
          </Button>
          <Button appearance="ghost" loading>
            Ghost
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));
