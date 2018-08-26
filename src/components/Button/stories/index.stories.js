import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import ButtonToolbar from 'components/ButtonToolbar';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';

import SvgIcon from './vsuite.svg';

import './style.less';

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

stories.add('size', () => ({
  render() {
    return (
      <Demo title="Size">
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

        <ButtonToolbar>
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

        <ButtonToolbar style={{ background: '#000', padding: '10px' }}>
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
            <Icon icon="facebook-official" /> Facebook
          </Button>
          <Button color="red">
            <Icon icon="google-plus-circle" /> Google Plus
          </Button>
          <Button color="cyan">
            <Icon icon="twitter" /> Twitter
          </Button>
          <Button color="blue">
            <Icon icon="linkedin" /> LinkedIn
          </Button>
          <Button color="green">
            <Icon icon="wechat" /> WeChat
          </Button>
          <Button color="yellow">
            <Icon icon="weibo" /> WeiBo
          </Button>
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('icon', () => ({
  render() {
    return (
      <Demo title="Icon">
        <ButtonToolbar>
          <IconButton icon="star" />
          <IconButton icon="star" appearance="primary" />
          <ButtonGroup>
            <IconButton icon="align-left" />
            <IconButton icon="align-center" />
            <IconButton icon="align-right" />
            <IconButton icon="align-justify" />
          </ButtonGroup>
        </ButtonToolbar>

        <ButtonToolbar>
          <IconButton size="lg" icon="star" />
          <IconButton size="lg" icon={SvgIcon} />
          <IconButton size="md" icon="star" />
          <IconButton size="md" icon={SvgIcon} />
          <IconButton size="sm" icon="star" />
          <IconButton size="sm" icon={SvgIcon} />
          <IconButton size="xs" icon="star" />
          <IconButton size="xs" icon={SvgIcon} />
        </ButtonToolbar>

        <ButtonToolbar>
          <IconButton icon="facebook-official" color="blue" circle />
          <IconButton icon="google-plus-circle" color="red" circle />
          <IconButton icon="twitter" color="cyan" circle />
          <IconButton icon="linkedin" color="blue" circle />
        </ButtonToolbar>

        <ButtonToolbar>
          <IconButton icon="pause" placement="left">
            Pause
          </IconButton>
          <IconButton icon="arrow-right" placement="right">
            Next
          </IconButton>
        </ButtonToolbar>

        <ButtonToolbar>
          <IconButton icon={SvgIcon}>Component</IconButton>
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
          <Button appearance="link" href="#" disabled>
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

stories.add('group', () => ({
  render(h) {
    return (
      <Demo title="Group">
        {this._renderButtonGroup(h)}
        {this._renderButtonGroup(h, 'primary')}
        {this._renderButtonGroup(h, 'link')}
        {this._renderButtonGroup(h, 'subtle')}
        {this._renderButtonGroup(h, 'ghost')}
      </Demo>
    );
  },

  methods: {
    _renderButtonGroup(h, appearance) {
      return (
        <ButtonToolbar>
          <ButtonGroup>
            <Button appearance={appearance}>Left</Button>
            <Button appearance={appearance}>Center</Button>
            <Button appearance={appearance}>Right</Button>
          </ButtonGroup>
        </ButtonToolbar>
      );
    },
  },
}));

stories.add('vertical', () => ({
  render(h) {
    return (
      <Demo title="Vertical">
        <ButtonToolbar>
          {this._renderButtonGroup(h)}
          {this._renderButtonGroup(h, 'primary')}
          {this._renderButtonGroup(h, 'link')}
          {this._renderButtonGroup(h, 'subtle')}
          {this._renderButtonGroup(h, 'ghost')}
        </ButtonToolbar>
      </Demo>
    );
  },

  methods: {
    _renderButtonGroup(h, appearance) {
      return (
        <ButtonGroup vertical>
          <Button appearance={appearance}>Left</Button>
          <Button appearance={appearance}>Center</Button>
          <Button appearance={appearance}>Right</Button>
        </ButtonGroup>
      );
    },
  },
}));

stories.add('toolbar', () => ({
  render(h) {
    return (
      <Demo title="Toolbar">
        <ButtonToolbar>
          <Button>Prev</Button>
          <ButtonGroup>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
            <Button>5</Button>
          </ButtonGroup>
          <Button>Next</Button>
        </ButtonToolbar>
        <ButtonToolbar>
          <IconButton icon="file-text" />
          <IconButton icon="save" />
          <ButtonGroup>
            <IconButton icon="bold" />
            <IconButton icon="italic" />
            <IconButton icon="underline" />
            <IconButton icon="strikethrough" />
          </ButtonGroup>
          <ButtonGroup>
            <IconButton icon="align-left" />
            <IconButton icon="align-center" />
            <IconButton icon="align-right" />
            <IconButton icon="align-justify" />
          </ButtonGroup>
          <IconButton icon="link" />
        </ButtonToolbar>
      </Demo>
    );
  },
}));

stories.add('justified', () => ({
  render(h) {
    return (
      <Demo title="Justified">
        <ButtonToolbar>
          {this._renderButtonGroup(h)}
          {this._renderButtonGroup(h, 'primary')}
          {this._renderButtonGroup(h, 'link')}
          {this._renderButtonGroup(h, 'subtle')}
          {this._renderButtonGroup(h, 'ghost')}
        </ButtonToolbar>
      </Demo>
    );
  },

  methods: {
    _renderButtonGroup(h, appearance) {
      return (
        <ButtonGroup style={{ marginTop: '12px' }} justified>
          <Button appearance={appearance}>Top</Button>
          <Button appearance={appearance}>Middle</Button>
          <Button appearance={appearance}>Bottom</Button>
        </ButtonGroup>
      );
    },
  },
}));
