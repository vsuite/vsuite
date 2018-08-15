import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import Modal from 'components/Modal';

const stories = storiesOf('Data Entry|Form', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Form>
          <Form.Item label="Username" name="name" help="Required">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" help="Required" tooltip>
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
          <Form.Item label="Email" name="email" help="Required" tooltip>
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
          <Form.Item label="Username" name="name" help="Required">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" help="Required" tooltip>
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
          <Form.Item label="Username" name="username" help="Required" tooltip>
            <Input style={{ width: 160 }} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" style={{ width: 160 }} />
          </Form.Item>
          <Button>Login</Button>
        </Form>

        <hr />

        <Form layout="inline">
          <Form.Item label="Username" name="username" labelSrOnly>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item label="Username" name="password" labelSrOnly>
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
    return { visible: false };
  },

  render() {
    return (
      <Demo title="Modal">
        <Button onClick={this._handleOpen}>Open</Button>

        <Modal visible={this.visible} title="New User">
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
      <Demo title="Help" help="This field is required">
        <Form>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="name" help="This field is required" tooltip>
            <Input placeholder="Name" />
          </Form.Item>
        </Form>
      </Demo>
    );
  },
}));
