import { storiesOf } from '@storybook/vue';

import Dropdown from 'components/Dropdown';
import Nav from 'components/Nav';
import Grid from 'components/Grid';
import Demo from 'stories/demo';

const stories = storiesOf('Navigation|Nav', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
        <Nav>
          <Nav.Item icon="home">Home</Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Solutions</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Nav.Item>About</Nav.Item>
        </Nav>
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  data() {
    return {
      active: 'home',
    };
  },

  render(h) {
    return (
      <Demo title="Appearance">
        {this._renderCustomNav(h, {})}
        {this._renderCustomNav(h, { appearance: 'tabs' })}
        {this._renderCustomNav(h, {
          appearance: 'tabs',
          reversed: true,
        })}
        {this._renderCustomNav(h, {
          appearance: 'subtle',
        })}
        {this._renderCustomNav(h, {
          appearance: 'subtle',
          reversed: true,
        })}
      </Demo>
    );
  },

  methods: {
    _renderCustomNav(h, props) {
      const data = {
        style: { marginBottom: '50px' },
        props: { ...props, activeKey: this.active },
        on: { select: this._handleSelect },
      };

      return (
        <Nav {...data}>
          <Nav.Item eventKey="home" icon="home">
            Home
          </Nav.Item>
          <Nav.Item eventKey="news">News</Nav.Item>
          <Nav.Item eventKey="solutions">Solutions</Nav.Item>
          <Nav.Item eventKey="products">Products</Nav.Item>
          <Nav.Item eventKey="about">About</Nav.Item>
        </Nav>
      );
    },

    _handleSelect(eventKey) {
      this.active = eventKey;
    },
  },
}));

stories.add('vertical', () => ({
  data() {
    return {
      active: 'home',
    };
  },

  render(h) {
    return (
      <Demo title="Vertical">
        <Grid.Row>
          <Grid.Col xs={12} sm={6} md={4}>
            {this._renderCustomNav(h, {})}
          </Grid.Col>

          <Grid.Col xs={12} sm={6} md={6}>
            {this._renderCustomNav(h, { appearance: 'tabs' })}
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            {this._renderCustomNav(h, {
              appearance: 'tabs',
              reversed: true,
            })}
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            {this._renderCustomNav(h, {
              appearance: 'subtle',
            })}
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            {this._renderCustomNav(h, {
              appearance: 'subtle',
              reversed: true,
            })}
          </Grid.Col>
        </Grid.Row>
      </Demo>
    );
  },
  methods: {
    _renderCustomNav(h, props) {
      const data = {
        style: { width: '100px', marginBottom: '30px' },
        props: {
          ...props,
          activeKey: this.active,
          vertical: true,
        },
        on: {
          select: this._handleSelect,
        },
      };

      return (
        <Nav {...data}>
          <Nav.Item eventKey="home" icon="home">
            Home
          </Nav.Item>
          <Nav.Item eventKey="news">News</Nav.Item>
          <Nav.Item eventKey="solutions">Solutions</Nav.Item>
          <Nav.Item eventKey="products">Products</Nav.Item>
          <Nav.Item eventKey="about">About</Nav.Item>
        </Nav>
      );
    },

    _handleSelect(eventKey) {
      this.active = eventKey;
    },
  },
}));

stories.add('active & disabled', () => ({
  render() {
    return (
      <Demo title="Active & Disabled">
        <Nav>
          <Nav.Item>Default Item</Nav.Item>
          <Nav.Item active>Active Item</Nav.Item>
          <Nav.Item disabled>Disabled Item</Nav.Item>
        </Nav>
        <br />
        <Nav appearance="tabs">
          <Nav.Item>Default Item</Nav.Item>
          <Nav.Item active>Active Item</Nav.Item>
          <Nav.Item disabled>Disabled Item</Nav.Item>
        </Nav>
        <br />
        <Nav appearance="subtle">
          <Nav.Item>Default Item</Nav.Item>
          <Nav.Item active>Active Item</Nav.Item>
          <Nav.Item disabled>Disabled Item</Nav.Item>
        </Nav>
      </Demo>
    );
  },
}));

stories.add('justified', () => ({
  render() {
    return (
      <Demo title="Justified">
        <Nav justified>
          <Nav.Item active icon="home">
            Home
          </Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Solutions</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Nav.Item>About</Nav.Item>
        </Nav>
        <br />
        <Nav appearance="tabs" justified>
          <Nav.Item active icon="home">
            Home
          </Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Solutions</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Nav.Item>About</Nav.Item>
        </Nav>
        <br />
        <Nav appearance="subtle" justified>
          <Nav.Item active icon="home">
            Home
          </Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Solutions</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Nav.Item>About</Nav.Item>
        </Nav>
      </Demo>
    );
  },
}));

stories.add('multi-level', () => ({
  render() {
    return (
      <Demo title="Multi-Level">
        <Nav>
          <Nav.Item active>Item A</Nav.Item>
          <Nav.Item>Item B</Nav.Item>
          <Nav.Item>Item C</Nav.Item>
          <Nav.Item>Item D</Nav.Item>
          <Dropdown title="Item E">
            <Dropdown.Item>Item E-1</Dropdown.Item>
            <Dropdown.Item>Item E-2</Dropdown.Item>
            <Dropdown.Item>Item E-3</Dropdown.Item>
            <Dropdown.Item>Item E-4</Dropdown.Item>
            <Dropdown.Menu title="Item E-4">
              <Dropdown.Item>Item E-4-1</Dropdown.Item>
              <Dropdown.Item active>Item E-4-2</Dropdown.Item>
              <Dropdown.Item>Item E-4-3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Demo>
    );
  },
}));

stories.add('icon', () => ({
  render() {
    return (
      <Demo title="Icon">
        <Nav>
          <Nav.Item icon="facebook-square">facebook</Nav.Item>
          <Nav.Item icon="github-alt">github</Nav.Item>
          <Nav.Item icon="circle">amazon</Nav.Item>
          <Nav.Item icon="chrome">chrome</Nav.Item>
          <Dropdown icon="ellipsis-h" title="more...">
            <Dropdown.Item icon="dropbox">dropbox</Dropdown.Item>
            <Dropdown.Item icon="firefox">firefox</Dropdown.Item>
            <Dropdown.Item icon="gitlab">gitlab</Dropdown.Item>
            <Dropdown.Item icon="linux">linux</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Demo>
    );
  },
}));

// stories.add('router-link', () => ({
//   render() {
//     return (
//       <Demo title="RouterLink">
//         <Nav>
//           <Nav.Item componentClass="router-link" to="/">
//             Home
//           </Nav.Item>
//           <Nav.Item componentClass="router-link" to="/guide/introduction">
//             Guide
//           </Nav.Item>
//           <Nav.Item componentClass="router-link" to="/components/overview">
//             Components
//           </Nav.Item>
//           <Nav.Item componentClass="router-link" to="/tools/palette">
//             Tools
//           </Nav.Item>
//         </Nav>
//       </Demo>
//     );
//   },
// }));
