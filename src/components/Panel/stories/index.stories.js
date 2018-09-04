import { storiesOf } from '@storybook/vue';

import Panel from 'components/Panel';
import Demo from 'stories/demo';
import Content, { Paragraph } from 'stories/content';

const stories = storiesOf('Data Display|Panel', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Content>
          <Panel>
            <h3 slot="header">Panel title</h3>
            <Paragraph />
          </Panel>
        </Content>
      </Demo>
    );
  },
}));

stories.add('border', () => ({
  render: h => {
    return (
      <Demo title="Border">
        <Content>
          <Panel bordered>
            <h3 slot="header">Panel title</h3>
            <Paragraph />
          </Panel>
        </Content>
      </Demo>
    );
  },
}));

stories.add('no-title', () => ({
  render: h => {
    return (
      <Demo title="No title">
        <Content>
          <Panel bordered>
            <Paragraph size="small" />
          </Panel>
        </Content>
      </Demo>
    );
  },
}));

stories.add('collapsible', () => ({
  render: h => {
    return (
      <Demo title="Collapsible">
        <Content>
          <Panel header="Panel title" collapsible bordered>
            <Paragraph />
          </Panel>
        </Content>
      </Demo>
    );
  },
}));

stories.add('fill-body', () => ({
  render: h => {
    return (
      <Demo title="Fill body">
        <Content>
          <Panel bordered bodyFill>
            <h3 slot="header">User List</h3>
            <Paragraph />
          </Panel>
        </Content>
      </Demo>
    );
  },
}));
