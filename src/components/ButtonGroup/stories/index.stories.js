import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import ButtonGroup from 'components/ButtonGroup';
import IconButton from 'components/IconButton';

const stories = storiesOf('General|ButtonGroup', module);

stories.addDecorator(withKnobs);

stories.add('default', () => ({
  render: h => {
    return (
      <div className="container">
        <div style={{ margin: '15px' }}>
          <ButtonGroup>
            <IconButton icon="align-left" />
            <IconButton icon="align-center" />
            <IconButton icon="align-right" />
            <IconButton icon="align-justify" />
          </ButtonGroup>
        </div>
      </div>
    );
  },
}));
