import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs';
import Demo from 'stories/demo';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import ButtonToolbar from 'components/ButtonToolbar';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import zipArray from 'utils/zipArray';
import { SIZES, COLORS } from 'utils/constant';

const stories = storiesOf('General|Button', module);
const appearanceOptions = zipArray(
  ['default', 'primary', 'link', 'subtle', 'ghost'],
  ['default', 'primary', 'link', 'subtle', 'ghost']
);
const sizeOptions = zipArray(SIZES, SIZES);
const colorOptions = zipArray(COLORS, COLORS);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    const appearance = selectV2('appearance', appearanceOptions, 'default');

    return (
      <Demo title="Default">
        <div style={{ margin: '10px' }}>
          <Button appearance={appearance}>Default</Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button appearance={appearance} active>
            Active
          </Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button appearance={appearance} disabled>
            Disabled
          </Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button appearance={appearance} loading>
            Loading
          </Button>
        </div>
      </Demo>
    );
  },
}));

stories.add('size & color', () => ({
  render: h => {
    const color = selectV2('color', colorOptions, 'red');
    const size = selectV2('size', sizeOptions, 'lg');

    return (
      <Demo title="Size & Color">
        <Button color={color} size={size}>
          Size & Color
        </Button>
      </Demo>
    );
  },
}));

stories.add('link', () => ({
  render: h => {
    const appearance = selectV2('appearance', appearanceOptions, 'default');
    const color = selectV2('color', colorOptions, 'red');
    const size = selectV2('size', sizeOptions, 'lg');
    const href = text('href', '#');

    return (
      <Demo title="Link">
        <div style={{ margin: '15px' }}>
          <Button href={href} appearance={appearance} size={size} color={color}>
            Download
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button
            href={href}
            appearance={appearance}
            size={size}
            color={color}
            active
          >
            Download
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button
            href={href}
            appearance={appearance}
            size={size}
            color={color}
            disabled
          >
            Download
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button
            href={href}
            appearance={appearance}
            size={size}
            color={color}
            loading
          >
            Download
          </Button>
        </div>
      </Demo>
    );
  },
}));

stories.add('icon', () => ({
  render: h => {
    return (
      <Demo title="Icon">
        <div style={{ margin: '15px' }}>
          <Button color="blue">
            <Icon icon="facebook-official" /> Facebook
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button color="red">
            <Icon icon="google-plus-circle" /> Google Plus
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button color="cyan">
            <Icon icon="twitter" /> Twitter
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button color="blue">
            <Icon icon="linkedin" /> LinkedIn
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button color="green">
            <Icon icon="wechat" /> WeChat
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button color="yellow">
            <Icon icon="weibo" /> WeiBo
          </Button>
        </div>
      </Demo>
    );
  },
}));

stories.add('<IconButton>', () => ({
  render: h => {
    return (
      <Demo title="<IconButton>">
        <div style={{ margin: '15px' }}>
          <IconButton style="color: #ccc;" icon="star" />
        </div>
        <div style={{ margin: '15px' }}>
          <IconButton icon="star">Favour</IconButton>
        </div>
        <div style={{ margin: '15px' }}>
          <IconButton icon="star" appearance="primary" />
        </div>
        <div style={{ margin: '15px' }}>
          <IconButton icon="star" appearance="primary">
            Favour
          </IconButton>
        </div>
      </Demo>
    );
  },
}));

stories.add('<ButtonGroup>', () => ({
  render: h => {
    return (
      <Demo title="<ButtonGroup>">
        <div style={{ margin: '15px' }}>
          <ButtonGroup>
            <IconButton icon="align-left" />
            <IconButton icon="align-center" />
            <IconButton icon="align-right" />
            <IconButton icon="align-justify" />
          </ButtonGroup>
        </div>
        <div style={{ margin: '15px' }}>
          <ButtonGroup justified>
            <Button>Top</Button>
            <Button>Middle</Button>
            <Button>Bottom</Button>
          </ButtonGroup>
        </div>
      </Demo>
    );
  },
}));

stories.add('<ButtonToolbar>', () => ({
  render: h => {
    return (
      <Demo title="<ButtonToolbar>">
        <div style={{ margin: '15px' }}>
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
        </div>
        <div style={{ margin: '15px' }}>
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
        </div>
      </Demo>
    );
  },
}));
