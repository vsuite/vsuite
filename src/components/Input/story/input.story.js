import { storiesOf } from '@storybook/vue';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Icon from 'components/Icon';
import Grid from 'components/Grid';
import Tooltip from 'components/Tooltip';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Input', module);
const Row = Grid.Row;
const Col = Grid.Col;

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Input style={{ width: '300px' }} placeholder="Default Input" />
      </Demo>
    );
  },
}));

stories.add('initial', () => ({
  render() {
    return (
      <Demo title="Initial">
        <Input
          defaultValue="you can delete me"
          style={{ width: '300px' }}
          placeholder="Default Input"
        />
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  render() {
    return (
      <Demo title="Size">
        <Row>
          <Col xs={24} sm={12} md={8}>
            <Input
              style={{ marginBottom: '10px' }}
              size="lg"
              placeholder="Large"
            />
            <Input
              style={{ marginBottom: '10px' }}
              size="md"
              placeholder="Medium"
            />
            <Input
              style={{ marginBottom: '10px' }}
              size="sm"
              placeholder="Small"
            />
            <Input
              style={{ marginBottom: '10px' }}
              size="xs"
              placeholder="XSmall"
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InputGroup style={{ marginBottom: '10px' }} size="lg">
              <Input placeholder="Large" />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <InputGroup style={{ marginBottom: '10px' }} size="md">
              <Input placeholder="Medium" />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <InputGroup style={{ marginBottom: '10px' }} size="sm">
              <Input placeholder="Small" />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <InputGroup style={{ marginBottom: '10px' }} size="xs">
              <Input placeholder="XSmall" />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <InputGroup inside style={{ marginBottom: '10px' }} size="lg">
              <Input placeholder="Large" />
              <InputGroup.Button>
                <Icon icon="search" />
              </InputGroup.Button>
            </InputGroup>
            <InputGroup inside style={{ marginBottom: '10px' }} size="md">
              <Input placeholder="Medium" />
              <InputGroup.Button>
                <Icon icon="search" />
              </InputGroup.Button>
            </InputGroup>
            <InputGroup inside style={{ marginBottom: '10px' }} size="sm">
              <Input placeholder="Small" />
              <InputGroup.Button>
                <Icon icon="search" />
              </InputGroup.Button>
            </InputGroup>
            <InputGroup inside style={{ marginBottom: '10px' }} size="xs">
              <Input placeholder="XSmall" />
              <InputGroup.Button>
                <Icon icon="search" />
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </Row>
      </Demo>
    );
  },
}));

stories.add('textarea', () => ({
  render() {
    return (
      <Demo title="Textarea">
        <Input
          componentClass="textarea"
          rows={3}
          style={{ width: '300px' }}
          placeholder="Textarea"
        />

        <hr />

        <Input
          componentClass="textarea"
          rows={3}
          style={{ width: '300px', resize: 'vertical' }}
          placeholder="resize: 'vertical'"
        />
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <Input style={{ width: '300px', marginBottom: '10px' }} disabled />

        <InputGroup style={{ width: '300px', marginBottom: '10px' }} disabled>
          <Input />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  data() {
    return { value: 'You can change me' };
  },

  render() {
    return (
      <Demo title="Control">
        <Input
          style={{ width: '300px', marginBottom: '10px' }}
          value="You cannot change me!"
        />
        <Input
          style={{ width: '300px' }}
          value={this.value}
          placeholder="Default Input"
          onChange={this._handleChange}
        />
      </Demo>
    );
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },
  },
}));

stories.add('tooltip', () => ({
  render() {
    return (
      <Demo title="Tooltip">
        <Tooltip placement="right" trigger="focus" title="Required">
          <Input style="width: 300px" placeholder="Default Input" />
        </Tooltip>
      </Demo>
    );
  },
}));
