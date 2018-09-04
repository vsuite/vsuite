import { storiesOf } from '@storybook/vue';

import Panel from 'components/Panel';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';

const stories = storiesOf('Data Display|PanelGroup', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Group">
        <Content>
          <Panel.Group>
            <Panel header="Panel 1">
              <Paragraph />
            </Panel>
            <Panel header="Panel 2">
              <Paragraph />
            </Panel>
            <Panel header="Panel 3">
              <Paragraph />
            </Panel>
          </Panel.Group>
        </Content>
      </Demo>
    );
  },
}));

stories.add('collapse', () => ({
  render: h => {
    return (
      <Demo title="Collapse">
        <Content>
          <Panel.Group accordion bordered>
            <Panel header="Panel 1" defaultExpanded>
              <Paragraph />
            </Panel>
            <Panel header="Panel 2">
              <Paragraph />
            </Panel>
            <Panel header="Panel 3">
              <Paragraph />
            </Panel>
          </Panel.Group>
        </Content>
      </Demo>
    );
  },
}));

stories.add('accordion', () => ({
  render: h => {
    return (
      <Demo title="Accordion">
        <Content>
          <Panel.Group accordion defaultActiveKey={1} bordered>
            <Panel header="Panel 1" eventKey={1}>
              <Paragraph size="small" />
            </Panel>
            <Panel header="Panel 2" eventKey={2}>
              <Paragraph size="small" />
            </Panel>
            <Panel header="Panel 3" eventKey={3}>
              <Paragraph size="small" />
            </Panel>
          </Panel.Group>
        </Content>
      </Demo>
    );
  },
}));
