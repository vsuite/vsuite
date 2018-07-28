import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs';
import Button from 'components/Button';
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
      <div className="container">
        <div style={{ margin: '15px' }}>
          <Button appearance={appearance} onClick={action('@click')}>
            Default
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button appearance={appearance} active onClick={action('@click')}>
            Active
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button appearance={appearance} disabled onClick={action('@click')}>
            Disabled
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button appearance={appearance} loading onClick={action('@click')}>
            Loading
          </Button>
        </div>
      </div>
    );
  },
}));

stories.add('size & color', () => ({
  render: h => {
    const color = selectV2('color', colorOptions, 'red');
    const size = selectV2('size', sizeOptions, 'lg');

    return (
      <div style={{ margin: '15px' }}>
        <Button color={color} size={size} onClick={action('@click')}>
          Size & Color
        </Button>
      </div>
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
      <div className="container">
        <div style={{ margin: '15px' }}>
          <Button
            href={href}
            appearance={appearance}
            size={size}
            color={color}
            onClick={action('@click')}
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
            active
            onClick={action('@click')}
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
            onClick={action('@click')}
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
            onClick={action('@click')}
          >
            Download
          </Button>
        </div>
      </div>
    );
  },
}));

stories.add('with icon', () => ({
  render: h => {
    return (
      <div className="container">
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
      </div>
    );
  },
}));
