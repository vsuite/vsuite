import { storiesOf } from '@storybook/vue';

import Icon from '@/components/Icon';
import Input from '@/components/Input';
import InputNumber from '@/components/InputNumber';
import InputGroup from '@/components/InputGroup';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Input.Group', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
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

stories.add('inside', () => ({
  render() {
    return (
      <Demo title="Inside">
        <InputGroup inside style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>

        <InputGroup inside style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>

        <InputGroup inside style={{ width: '300px', marginBottom: '10px' }}>
          <InputGroup.Addon>$</InputGroup.Addon>
          <Input />
          <InputGroup.Addon>.00</InputGroup.Addon>
        </InputGroup>

        <InputGroup inside style={{ width: '300px', marginBottom: '10px' }}>
          <InputGroup.Addon>
            <Icon icon="avatar" />
          </InputGroup.Addon>
          <Input />
        </InputGroup>
      </Demo>
    );
  },
}));

stories.add('button', () => ({
  render() {
    return (
      <Demo title="Button">
        <InputGroup style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>

        <InputGroup inside style={{ width: '300px', marginBottom: '10px' }}>
          <Input />
          <InputGroup.Button>
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
      </Demo>
    );
  },
}));
