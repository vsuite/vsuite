import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs';
import zipArray from 'utils/zipArray';
import { SIZES, COLORS } from 'utils/constant';

import Button from '../button.vue';

const stories = storiesOf('General|Button', module);
const typeOptions = zipArray(
  ['default', 'primary', 'link', 'subtle', 'ghost'],
  ['default', 'primary', 'link', 'subtle', 'ghost']
);
const sizeOptions = zipArray(SIZES, SIZES);
const colorOptions = zipArray(COLORS, COLORS);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    const type = selectV2('type', typeOptions, 'default');

    return (
      <div className="container">
        <div style={{ margin: '15px' }}>
          <Button type={type}>Default</Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button type={type} active>
            Active
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button type={type} disabled>
            Disabled
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button type={type} loading>
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
        <Button color={color} size={size}>
          Size & Color
        </Button>
      </div>
    );
  },
}));

stories.add('link', () => ({
  render: h => {
    const type = selectV2('type', typeOptions, 'default');
    const color = selectV2('color', colorOptions, 'red');
    const size = selectV2('size', sizeOptions, 'lg');
    const href = text('href', '#');

    return (
      <div className="container">
        <div style={{ margin: '15px' }}>
          <Button href={href} type={type} size={size} color={color}>
            Download
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button href={href} type={type} size={size} color={color} active>
            Download
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button href={href} type={type} size={size} color={color} disabled>
            Download
          </Button>
        </div>
        <div style={{ margin: '15px' }}>
          <Button href={href} type={type} size={size} color={color} loading>
            Download
          </Button>
        </div>
      </div>
    );
  },
}));
