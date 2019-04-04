import { storiesOf } from '@storybook/vue';

import Progress from 'components/Progress';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Progress', module);

stories.add('<ProgressLine>', () => ({
  render: h => {
    return (
      <Demo title="<ProgressLine>">
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

stories.add('<ProgressCircle>', () => ({
  render: h => {
    return (
      <Demo title="<ProgressCircle>">
        <Content>
          <div style={{ width: '120px', marginTop: 10 }}>
            <Progress.Circle />
          </div>
          <div style={{ width: '120px', marginTop: 10 }}>
            <Progress.Circle percent={30} strokeColor="yellow" />
          </div>
          <div style={{ width: '120px', marginTop: 10 }}>
            <Progress.Circle percent={100} status="success" />
          </div>
          <div style={{ width: '120px', marginTop: 10 }}>
            <Progress.Circle percent={30} status="fail" />
          </div>
          <div style={{ width: '120px' }}>
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

  render(h) {
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
            strokeColor="#3385ff"
            status="active"
          />
          <div style={{ width: '120px', marginTop: 10 }}>
            <Progress.Circle
              percent={this.percent}
              strokeColor="#3385ff"
              status="active"
            />
          </div>
        </Content>
      </Demo>
    );
  },
}));
