import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Timeline from 'components/Timeline';
import Icon from 'components/Icon';

const stories = storiesOf('Data Display|Timeline', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Timeline>
          <Timeline.Item>16:27:41 您的订单开始处理</Timeline.Item>
          <Timeline.Item>16:28:43 您的订单待配货</Timeline.Item>
          <Timeline.Item>16:28:45 您的包裹已出库</Timeline.Item>
          <Timeline.Item>02:34:41 发往上海虹口区公司</Timeline.Item>
          <Timeline.Item>15:05:29 正在为您派件</Timeline.Item>
        </Timeline>
      </Demo>
    );
  },
}));

stories.add('color', () => ({
  render: h => {
    return (
      <Demo title="Color">
        <Timeline>
          <Timeline.Item color="green">16:27:41 您的订单开始处理</Timeline.Item>
          <Timeline.Item color="green">16:28:43 您的订单待配货</Timeline.Item>
          <Timeline.Item color="red">16:28:45 您的包裹已出库</Timeline.Item>
          <Timeline.Item color="yellow">
            02:34:41 发往上海虹口区公司
          </Timeline.Item>
          <Timeline.Item color="blue">15:05:29 正在为您派件</Timeline.Item>
        </Timeline>
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render: h => {
    return (
      <Demo title="Custom">
        <Timeline>
          <Timeline.Item dot="check-circle" color="green">
            <p>2018-03-01</p>
            <p>您的订单开始处理</p>
          </Timeline.Item>
          <Timeline.Item dot="exclamation-triangle" color="green">
            <p>2018-03-02</p>
            <p>订单缺货</p>
          </Timeline.Item>
          <Timeline.Item dot="info-circle" color="red">
            <p>2018-03-10</p>
            <p>到货</p>
          </Timeline.Item>
          <Timeline.Item dot="check-circle" color="yellow">
            <p>2018-03-12</p>
            <p>订单出库</p>
          </Timeline.Item>
          <Timeline.Item>
            <Icon slot="dot" icon="spinner" spin />
            <p>2018-03-15</p>
            <p>正在为您派件</p>
          </Timeline.Item>
        </Timeline>
      </Demo>
    );
  },
}));
