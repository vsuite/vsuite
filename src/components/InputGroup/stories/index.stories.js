import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Icon from 'components/Icon';
import Input from 'components/Input';
import InputNumber from 'components/InputNumber';
import InputGroup from 'components/InputGroup';

const stories = storiesOf('Data Entry|InputGroup', module);

stories.add('combination', () => ({
  render() {
    return (
      <Demo title="Combination">
        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <InputGroup.Addon> @</InputGroup.Addon>
          <Input />
        </InputGroup>

        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Addon>.com</InputGroup.Addon>
        </InputGroup>

        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <InputGroup.Addon>$</InputGroup.Addon>
          <InputNumber />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>

        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Addon>to</InputGroup.Addon>
          <Input />
        </InputGroup>

        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>

        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <InputGroup.Addon>
            <Icon icon="avatar" />
          </InputGroup.Addon>
          <Input />
        </InputGroup>
      </Demo>
    );
  },
}));
