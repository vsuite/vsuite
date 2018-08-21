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
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
            <Col xs={2}>
              xs=
              {2}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={4}>
              xs=
              {4}
            </Col>
            <Col xs={4}>
              xs=
              {4}
            </Col>
            <Col xs={4}>
              xs=
              {4}
            </Col>
            <Col xs={4}>
              xs=
              {4}
            </Col>
            <Col xs={4}>
              xs=
              {4}
            </Col>
            <Col xs={4}>
              xs=
              {4}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={8}>
              xs=
              {8}
            </Col>
            <Col xs={8}>
              xs=
              {8}
            </Col>
            <Col xs={8}>
              xs=
              {8}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={12}>
              xs=
              {12}
            </Col>
            <Col xs={12}>
              xs=
              {12}
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));

stories.add('response', () => ({
  render: h => {
    return (
      <Demo title="Response">
        <Grid fluid>
          <Row class="show-grid">
            <Col xs={24} sm={24} md={8}>
              xs=
              {24} sm=
              {24} md=
              {6}
            </Col>
            <Col xs={24} sm={24} md={8}>
              xs=
              {24} sm=
              {24} md=
              {6}
            </Col>
            <Col xs={24} sm={24} md={8}>
              xs=
              {24} sm=
              {24} md=
              {6}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={24} sm={24} md={8} lg={6}>
              xs=
              {24} sm=
              {12} md=
              {6}
            </Col>
            <Col xs={24} sm={12} md={8} lg={12}>
              xs=
              {24} sm=
              {12} md=
              {6}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              xs=
              {24} sm=
              {12} md=
              {6}
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));

stories.add('gutter', () => ({
  render: h => {
    return (
      <Demo title="Gutter">
        <Grid fluid>
          <Row gutter={16}>
            <Col xs={4}>
              <div class="show-col">
                xs=
                {4}
              </div>
            </Col>
            <Col xs={4}>
              <div class="show-col">
                xs=
                {4}
              </div>
            </Col>
            <Col xs={4}>
              <div class="show-col">
                xs=
                {4}
              </div>
            </Col>
            <Col xs={4}>
              <div class="show-col">
                xs=
                {4}
              </div>
            </Col>
            <Col xs={4}>
              <div class="show-col">
                xs=
                {4}
              </div>
            </Col>
            <Col xs={4}>
              <div class="show-col">
                xs=
                {4}
              </div>
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));

stories.add('offset', () => ({
  render: h => {
    return (
      <Demo title="Offset">
        <Grid fluid>
          <Row class="show-grid">
            <Col xs={4} xsOffset={20}>
              xs=
              {4} xsOffset=
              {20}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={8} xsOffset={16}>
              xs=
              {8} xsOffset=
              {16}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={12} xsOffset={12}>
              xs=
              {12} xsOffset=
              {12}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={16} xsOffset={8}>
              xs=
              {16} xsOffset=
              {8}
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={20} xsOffset={4}>
              xs=
              {20} xsOffset=
              {4}
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));

stories.add('push', () => ({
  render: h => {
    return (
      <Demo title="Push">
        <Grid fluid>
          <Row class="show-grid">
            <Col xs={12} xsPush={12}>
              xs=
              {12} xsPush=
              {12} `left`
            </Col>
            <Col xs={12} xsPull={12}>
              xs=
              {12} xsPull=
              {12} `right`
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={6}>
              xs=
              {6} `left`
            </Col>
            <Col xs={6} xsPush={12}>
              xs=
              {6} xsPush=
              {12} `right`
            </Col>
          </Row>

          <Row class="show-grid">
            <Col xs={6} xsPush={18}>
              xs=
              {6} xsPush=
              {18} `left`
            </Col>
            <Col xs={6} xsPull={6}>
              xs=
              {6} xsPull=
              {6} `right`
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));

stories.add('hidden', () => ({
  render: h => {
    return (
      <Demo title="Hidden">
        <Grid fluid>
          <Row class="show-grid">
            <Col xsHidden xs={12}>
              xsHidden xs=
              {12}
            </Col>
            <Col xs={12} xs={12}>
              xs=
              {12} xs=
              {12}
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));

stories.add('nesting', () => ({
  render: h => {
    return (
      <Demo title="Nesting">
        <Grid fluid>
          <Row class="show-grid">
            <Col xs={12}>
              <Row class="show-grid">
                <Col xs={12}>
                  <Row class="show-grid">
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row class="show-grid">
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Row className="show-grid">
                <Col xs={12}>
                  <Row class="show-grid">
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row class="show-grid">
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                    <Col xs={12}>
                      xs=
                      {12}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Demo>
    );
  },
}));
