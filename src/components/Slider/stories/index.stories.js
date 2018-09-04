import { storiesOf } from '@storybook/vue';

import Slider from 'components/Slider';
import Row from 'components/Row';
import Col from 'components/Col';
import Demo from 'stories/demo';

import './style.less';

const stories = storiesOf('Data Entry|Slider', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Slider />
      </Demo>
    );
  },
}));

stories.add('initial', () => ({
  render() {
    return (
      <Demo title="Initial">
        <Slider defaultValue={50} />
      </Demo>
    );
  },
}));

stories.add('progress', () => ({
  render() {
    return (
      <Demo title="Progress">
        <Slider defaultValue={50} progress />
      </Demo>
    );
  },
}));

stories.add('graduated', () => ({
  render() {
    return (
      <Demo title="Graduated">
        <Slider defaultValue={30} min={10} step={10} max={60} graduated />
        <br />
        <Slider
          defaultValue={30}
          min={10}
          step={10}
          max={60}
          graduated
          progress
        />
        <br />
        <Slider
          defaultValue={30}
          min={10}
          step={10}
          max={60}
          graduated
          progress
          renderMark={(_, mark) => {
            return mark;
          }}
        />
        <br />
        <Slider
          defaultValue={128}
          step={64}
          graduated
          progress
          min={64}
          max={512}
          renderMark={(_, mark) => {
            if (~[64, 128, 256, 512].indexOf(mark)) {
              return <span>{mark} GB</span>;
            }

            return null;
          }}
        />
      </Demo>
    );
  },
}));

stories.add('vertical', () => ({
  render() {
    const styles = { height: '400px' };

    return (
      <Demo title="Vertical">
        <Row>
          <Col xs={6}>
            <Slider style={styles} defaultValue={50} vertical />
          </Col>
          <Col xs={6}>
            <Slider style={styles} defaultValue={50} vertical progress />
          </Col>
          <Col xs={6}>
            <Slider
              style={styles}
              defaultValue={50}
              step={10}
              graduated
              vertical
              progress
            />
          </Col>
          <Col xs={6}>
            <Slider
              style={styles}
              defaultValue={50}
              step={10}
              graduated
              vertical
              progress
              renderMark={mark => {
                return <span>{mark} °C</span>;
              }}
            />
          </Col>
        </Row>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <Slider disabled />
        <br />
        <Slider value={50} min={10} step={10} graduated progress disabled />
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    const labels = ['无', '精准', '相似', '模糊'];
    const handleStyle = {
      color: '#fff',
      fontSize: '12px',
      width: '32px',
      height: '22px',
    };

    return (
      <Demo title="Custom">
        人群扩展:
        <div style={{ width: '200px', margin: '20px' }}>
          <Slider
            id="customSlider"
            class="custom-slider"
            min={0}
            max={labels.length - 1}
            handleStyle={handleStyle}
            graduated
            tooltip={false}
            renderHandleTitle={(_, val) => labels[val]}
          />
        </div>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <Slider value={50} progress />
      </Demo>
    );
  },
}));
