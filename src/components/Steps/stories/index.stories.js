import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Steps, { STATUS } from 'components/Steps';
import Button from 'components/Button';

const stories = storiesOf('Navigation|Steps', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Steps current={1}>
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('title', () => ({
  render: h => {
    return (
      <Demo title="Title">
        <Steps current={1}>
          <Steps.Item title="Finished" />
          <Steps.Item title="In progress" />
          <Steps.Item title="Waiting" />
          <Steps.Item title="Waiting" />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('description', () => ({
  render: h => {
    return (
      <Demo title="Description">
        <Steps current={1}>
          <Steps.Item title="Finished" description="Description" />
          <Steps.Item title="In Progress" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('vertical', () => ({
  render: h => {
    const styles = {
      width: '200px',
      display: 'inline-table',
      verticalAlign: 'top',
    };

    return (
      <Demo title="Vertical">
        <Steps current={1} vertical style={styles}>
          <Steps.Item title="Finished" />
          <Steps.Item title="In progress" />
          <Steps.Item title="Waiting" />
          <Steps.Item title="Waiting" />
        </Steps>

        <Steps current={1} vertical style={styles}>
          <Steps.Item title="Finished" description="Description" />
          <Steps.Item title="In Progress" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('error', () => ({
  render: h => {
    return (
      <Demo title="Error">
        <Steps current={1} currentStatus={STATUS.ERROR}>
          <Steps.Item title="Finished" />
          <Steps.Item title="In progress" />
          <Steps.Item title="Waiting" />
          <Steps.Item title="Waiting" />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('small', () => ({
  render: h => {
    return (
      <Demo title="Small">
        <Steps current={1} small>
          <Steps.Item title="Finished" />
          <Steps.Item title="In progress" />
          <Steps.Item title="Waiting" />
          <Steps.Item title="Waiting" />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('icon', () => ({
  render: h => {
    return (
      <Demo title="Icon">
        <Steps current={1}>
          <Steps.Item title="Finished" icon="pencil-square" />
          <Steps.Item title="In Progress" icon="book" />
          <Steps.Item title="Waiting" icon="wechat" />
          <Steps.Item title="Waiting" icon="steam-square" />
        </Steps>
      </Demo>
    );
  },
}));

stories.add('dynamic', () => ({
  data() {
    return {
      step: 0,
      status: STATUS.PROCESS,
    };
  },

  render() {
    return (
      <Demo title="Dynamic">
        <Steps current={this.step} currentStatus={this.status}>
          <Steps.Item title="Finished" description="Description" />
          <Steps.Item title="In Progress" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
        </Steps>
        <hr />
        <Button.Group>
          <Button onClick={this.decline} disabled={this.step === 0}>
            Previous
          </Button>
          <Button onClick={this.increase} disabled={this.step === 3}>
            Next
          </Button>
        </Button.Group>
      </Demo>
    );
  },

  methods: {
    decline() {
      if (this.step <= 0) return;

      this.step -= 1;
      this.status = STATUS.PROCESS;
    },

    increase() {
      if (this.step >= 3) return;

      this.step += 1;

      if (this.step === 3) {
        this.status = STATUS.FINISH;
      } else {
        this.status = STATUS.PROCESS;
      }
    },
  },
}));
