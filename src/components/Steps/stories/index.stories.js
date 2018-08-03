import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Steps from 'components/Steps';

const stories = storiesOf('Navigation|Steps', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
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
