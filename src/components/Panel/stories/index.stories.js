import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';
import Panel from 'components/Panel';

const stories = storiesOf('Data Display|Panel', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Content>
          <Panel>
            <h3 slot="header">Single header slot</h3>
            <Paragraph />
          </Panel>
          <Panel>
            <template slot="header">
              <h3>Header 3</h3>
              <p>description</p>
            </template>
            <Paragraph />
          </Panel>
        </Content>
      </Demo>
    );
  },
}));
