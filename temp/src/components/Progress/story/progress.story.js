import { storiesOf } from '@storybook/vue';

import Progress from 'components/Progress';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Progress', module);

stories.add('line', () => ({
  render() {
    return (
      <Demo title="Line">
        <Content>
          <Progress.Line />
          <Progress.Line percent={30} strokeColor="yellow" />
          <Progress.Line percent={30} status="active" />
          <Progress.Line percent={50} status="fail" />
          <Progress.Line percent={100} status="success" />
          <Progress.Line percent={80} showInfo={false} />
        </Content>
      </Demo>
    );
  },
}));

stories.add('circle', () => ({
  render() {
    return (
      <Demo title="Circle">
        <Content>
          <div
            style={{ display: 'inline-block', width: '120px', margin: '10px' }}
          >
            <Progress.Circle />
          </div>
          <div
            style={{ display: 'inline-block', width: '120px', margin: '10px' }}
          >
            <Progress.Circle percent={30} strokeColor="yellow" />
          </div>
          <div
            style={{ display: 'inline-block', width: '120px', margin: '10px' }}
          >
            <Progress.Circle percent={100} status="success" />
          </div>
          <div
            style={{ display: 'inline-block', width: '120px', margin: '10px' }}
          >
            <Progress.Circle percent={30} status="fail" />
          </div>
          <div style={{ display: 'inline-block', width: '120px' }}>
            <Progress.Circle percent={30} status="active" showInfo={false} />
          </div>
        </Content>
      </Demo>
    );
  },
}));

stories.add('dynamic', () => ({
  data() {
    return {
      percent: 30,
    };
  },

  computed: {
    status() {
      return this.percent === 100 ? 'success' : null;
    },
    color() {
      return this.percent === 100 ? '#52c41a' : '#3385ff';
    },
  },

  render() {
    return (
      <Demo title="Dynamic">
        <Content>
          <Button.Group>
            <Button
              onClick={() =>
                (this.percent = this.percent - 10 <= 0 ? 0 : this.percent - 10)
              }
            >
              -
            </Button>
            <Button
              onClick={() =>
                (this.percent =
                  this.percent + 10 >= 100 ? 100 : this.percent + 10)
              }
            >
              +
            </Button>
          </Button.Group>
          <hr />
          <Progress.Line
            percent={this.percent}
            strokeColor={this.color}
            status={this.status}
          />
          <div style={{ width: '120px', margin: '10px' }}>
            <Progress.Circle
              percent={this.percent}
              strokeColor={this.color}
              status={this.status}
            />
          </div>
        </Content>
      </Demo>
    );
  },
}));
