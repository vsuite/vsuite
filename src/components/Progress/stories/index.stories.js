import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Content from 'stories/content';
import ProgressLine from 'components/ProgressLine';
import ProgressCircle from 'components/ProgressCircle';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';

const stories = storiesOf('General|Progress', module);

stories.add('<ProgressLine>', () => ({
  render: h => {
    return (
      <Demo title="<ProgressLine>">
        <Content>
          <ProgressLine />
          <ProgressLine percent={30} strokeColor="yellow" />
          <ProgressLine percent={30} status="active" />
          <ProgressLine percent={50} status="fail" />
          <ProgressLine percent={100} status="success" />
          <ProgressLine percent={80} showInfo={false} />
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
          <ProgressCircle />
          <ProgressCircle percent={30} strokeColor="yellow" />
          <ProgressCircle percent={100} status="success" />
          <ProgressCircle percent={30} status="fail" />
          <ProgressCircle percent={30} status="active" showInfo={false} />
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
          <ButtonGroup>
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
          </ButtonGroup>
          <hr />
          <ProgressLine
            percent={this.percent}
            strokeColor="#3385ff"
            status="active"
          />
          <div style={{ width: 120, marginTop: 10 }}>
            <ProgressCircle
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
