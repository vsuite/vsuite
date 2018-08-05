import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Grid from 'components/Grid';
import Row from 'components/Row';
import Col from 'components/Col';

import './style.less';

const stories = storiesOf('Layout|Grid', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <Grid fluid>
          <Row class="show-grid">
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
            <Col xs={2}>xs={2}</Col>
          </Row>

          <Row class="show-grid">
            <Col xs={4}>xs={4}</Col>
            <Col xs={4}>xs={4}</Col>
            <Col xs={4}>xs={4}</Col>
            <Col xs={4}>xs={4}</Col>
            <Col xs={4}>xs={4}</Col>
            <Col xs={4}>xs={4}</Col>
          </Row>

          <Row class="show-grid">
            <Col xs={8}>xs={8}</Col>
            <Col xs={8}>xs={8}</Col>
            <Col xs={8}>xs={8}</Col>
          </Row>

          <Row class="show-grid">
            <Col xs={12}>xs={12}</Col>
            <Col xs={12}>xs={12}</Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));
