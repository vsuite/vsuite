import { storiesOf } from '@storybook/vue';

import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|Form', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Form>
          <Form.Item
            label="Username"
            name="name"
            help="Required"
            helpTooltip={false}
          >
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
