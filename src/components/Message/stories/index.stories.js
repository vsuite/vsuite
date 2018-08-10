import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';
import Message from 'components/Message';

const stories = storiesOf('General|Message', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Message description="Informational" />
      </Demo>
    );
  },
}));

stories.add('status', () => ({
  render: h => {
    return (
      <Demo title="Status">
        <Message type="info" description="Informational" />
        <Message type="success" description="Success" />
        <Message type="warning" description="Warning" />
        <Message type="error" description="Error" />
      </Demo>
    );
  },
}));

stories.add('description', () => ({
  render: h => {
    return (
      <Demo title="Description">
        <Message
          type="info"
          title="Informational"
          description="Additional description and informations about copywriting."
        />

        <Message
          type="success"
          title="Success"
          description="Detailed description and advices about successful copywriting."
        />

        <Message
          type="warning"
          title="Warning"
          description="This is a warning notice about copywriting."
        />

        <Message
          type="error"
          title="Error"
          description="This is an error message about copywriting."
        />
      </Demo>
    );
  },
}));

stories.add('show-icon', () => ({
  render: h => {
    return (
      <Demo title="Show Icon">
        <Message showIcon type="info" description="Informational" />
        <Message showIcon type="success" description="Success" />
        <Message showIcon type="warning" description="Warning" />
        <Message showIcon type="error" description="Error" />

        <Message
          showIcon
          type="info"
          title="Informational"
          description="Additional description and informations about copywriting."
        />

        <Message
          showIcon
          type="success"
          title="Success"
          description="Detailed description and advices about successful copywriting."
        />

        <Message
          showIcon
          type="warning"
          title="Warning"
          description="This is a warning notice about copywriting."
        />

        <Message
          showIcon
          type="error"
          title="Error"
          description="This is an error message about copywriting."
        />
      </Demo>
    );
  },
}));

stories.add('closable', () => ({
  render: h => {
    return (
      <Demo title="Closable">
        <Message closable type="info" description="Informational" />
        <Message
          closable
          type="info"
          title="Informational"
          description="Detailed description and advices about successful copywriting."
        />
      </Demo>
    );
  },
}));

stories.add('full', () => ({
  render: h => {
    return (
      <Demo title="Full">
        <Content
          style={{
            background: '#000',
            padding: '20px',
            position: 'relative',
          }}
        >
          <Message full showIcon type="warning" description="Warning" />
          <Paragraph />
        </Content>
      </Demo>
    );
  },
}));
