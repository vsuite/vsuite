import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import FlexboxGrid from 'components/FlexboxGrid';
import Divider from 'components/Divider';

import './style.less';

const stories = storiesOf('Layout|FlexboxGrid', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <div class="show-grid">
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={6}>
              colspan=
              {6}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              colspan=
              {6}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              colspan=
              {6}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              colspan=
              {6}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </Demo>
    );
  },
}));

stories.add('layout', () => ({
  render: h => {
    return (
      <Demo title="Layout">
        <div class="show-grid">
          <Divider>justify="start"</Divider>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider>justify="center"</Divider>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider>justify="end"</Divider>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider>justify="space-between"</Divider>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider>justify="space-around"</Divider>
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              colspan=
              {4}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </Demo>
    );
  },
}));

stories.add('align', () => ({
  render: h => {
    return (
      <Demo title="Align">
        <div class="show-grid">
          <Divider>align="top"</Divider>
          <FlexboxGrid align="top">
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 1 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 2 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 3 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 4 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider>align="middle"</Divider>
          <FlexboxGrid align="middle">
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 1 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 2 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 3 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 4 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider>align="bottom"</Divider>
          <FlexboxGrid align="bottom">
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 1 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 2 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 3 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <div style={{ lineHeight: 4 }}>
                colspan=
                {6}
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </Demo>
    );
  },
}));

stories.add('sort', () => ({
  render: h => {
    return (
      <Demo title="Sort">
        <div class="show-grid">
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={4} order={4}>
              order=
              {4}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} order={3}>
              order=
              {3}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} order={2}>
              order=
              {2}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} order={1}>
              order=
              {1}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </Demo>
    );
  },
}));
