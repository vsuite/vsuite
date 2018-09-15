import { storiesOf } from '@storybook/vue';

import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import Toggle from 'components/Toggle';
import Modal from 'components/Modal';
import SelectPicker from 'components/SelectPicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Form', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Form>
          <Form.Item label="Username" name="name" help="Required" helpTooltip>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" help="Required">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Textarea" name="textarea">
            <Input rows={5} componentClass="textarea" />
          </Form.Item>
          <Form.Item>
            <Button.Toolbar>
              <Button appearance="primary">Submit</Button>
              <Button appearance="default">Cancel</Button>
            </Button.Toolbar>
          </Form.Item>
        </Form>
      </Demo>
    );
  },
}));

stories.add('fluid', () => ({
  render() {
    return (
      <Demo title="Fluid">
        <Form fluid>
          <Form.Item label="Username" name="name" help="Required">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" help="Required">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Textarea" name="textarea">
            <Input rows={5} componentClass="textarea" />
          </Form.Item>
          <Form.Item>
            <Button.Toolbar>
              <Button appearance="primary">Submit</Button>
              <Button appearance="default">Cancel</Button>
            </Button.Toolbar>
          </Form.Item>
        </Form>
      </Demo>
    );
  },
}));

stories.add('horizontal', () => ({
  render() {
    return (
      <Demo title="Horizontal">
        <Form layout="horizontal">
          <Form.Item label="Username" name="name" help="Required" helpTooltip>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" help="Required">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Textarea" name="textarea">
            <Input rows={5} componentClass="textarea" />
          </Form.Item>
          <Form.Item>
            <Button.Toolbar>
              <Button appearance="primary">Submit</Button>
              <Button appearance="default">Cancel</Button>
            </Button.Toolbar>
          </Form.Item>
        </Form>
      </Demo>
    );
  },
}));

stories.add('inline', () => ({
  render() {
    return (
      <Demo title="Inline">
        <Form layout="inline">
          <Form.Item name="username" label="Username">
            <Input style={{ width: '160px' }} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input
              style={{ width: '160px' }}
              placeholder="Password"
              type="password"
            />
          </Form.Item>
          <Button>Login</Button>
        </Form>

        <hr />

        <Form layout="inline">
          <Form.Item name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button>Login</Button>
        </Form>
      </Demo>
    );
  },
}));

stories.add('modal', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Modal">
        <Button.Toolbar>
          <Button onClick={this._handleOpen}>Open</Button>
        </Button.Toolbar>

        <Modal
          title="Modal Form"
          size="xs"
          visible={this.visible}
          onChange={v => (this.visible = v)}
        >
          <Form fluid>
            <Form.Item label="Username" name="name" help="Required">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" help="Required">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <Form.Item label="Textarea" name="textarea">
              <Input rows={5} componentClass="textarea" />
            </Form.Item>
          </Form>
        </Modal>
      </Demo>
    );
  },

  methods: {
    _handleOpen() {
      this.visible = !this.visible;
    },
  },
}));

stories.add('help', () => ({
  render() {
    return (
      <Demo title="Help">
        <Form>
          <Form.Item name="email" help="This field is required">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="name" help="This field is required" helpTooltip>
            <Input placeholder="Name" type="email" />
          </Form.Item>
        </Form>
      </Demo>
    );
  },
}));

stories.add('error', () => ({
  data() {
    return {
      showErrors: false,
      errorPlacement: 'bottom-start',
    };
  },

  render() {
    const placements = [
      {
        label: 'bottom-start',
        value: 'bottom-start',
      },
      {
        label: 'bottom-end',
        value: 'bottom-end',
      },
      {
        label: 'top-start',
        value: 'top-start',
      },
      {
        label: 'top-end',
        value: 'top-end',
      },
      {
        label: 'left-start',
        value: 'left-start',
      },
      {
        label: 'left-end',
        value: 'left-end',
      },
      {
        label: 'right-start',
        value: 'right-start',
      },
      {
        label: 'right-end',
        value: 'right-end',
      },
    ];

    return (
      <Demo title="Error">
        <Form>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="age">
            <Input placeholder="Custom error message" />
          </Form.Item>
        </Form>

        <hr />

        {'Show Error:'}
        <Toggle
          style={{ margin: '0 10px' }}
          checked={this.showErrors}
          onChange={this._handleShowChange}
        />
        <SelectPicker
          data={placements}
          cleanable={false}
          value={this.errorPlacement}
          onChange={this._handlePlacementChange}
        />
      </Demo>
    );
  },

  methods: {
    _handleShowChange(checked) {
      this.showErrors = checked;
    },

    _handlePlacementChange(placement) {
      this.errorPlacement = placement;
    },
  },
}));
