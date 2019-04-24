import { storiesOf } from '@storybook/vue';

import Dropdown from 'components/Dropdown';
import Navbar from 'components/Navbar';
import Nav from 'components/Nav';
import Demo from 'stories/demo';

const stories = storiesOf('Navigation|Navbar', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Navbar>
          <a href="#" class="navbar-brand" slot="header">
            VSUITE
          </a>
          <Nav>
            <Nav.Item icon="home">Home</Nav.Item>
            <Nav.Item>News</Nav.Item>
            <Nav.Item>Products</Nav.Item>
            <Dropdown title="About">
              <Dropdown.Item>Company</Dropdown.Item>
              <Dropdown.Item>Team</Dropdown.Item>
              <Dropdown.Item>Contact</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon="cog">Settings</Nav.Item>
          </Nav>
        </Navbar>
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  data() {
    return {
      activeKey: null,
    };
  },

  render(h) {
    return (
      <Demo title="Appearance">
        {this._renderNavbar(h)}
        <hr />
        {this._renderNavbar(h, 'inverse')}
        <hr />
        {this._renderNavbar(h, 'subtle')}
      </Demo>
    );
  },

  methods: {
    _renderNavbar(h, appearance) {
      return (
        <Navbar appearance={appearance}>
          <a href="#" class="navbar-brand" slot="header">
            VSUITE
          </a>
          <Nav onSelect={this._handleSelect} activeKey={this.activeKey}>
            <Nav.Item eventKey="1" icon="home">
              Home
            </Nav.Item>
            <Nav.Item eventKey="2">News</Nav.Item>
            <Nav.Item eventKey="3">Products</Nav.Item>
            <Dropdown title="About">
              <Dropdown.Item eventKey="4">Company</Dropdown.Item>
              <Dropdown.Item eventKey="5">Team</Dropdown.Item>
              <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon="cog">Settings</Nav.Item>
          </Nav>
        </Navbar>
      );
    },

    _handleSelect(key) {
      this.activeKey = key;
    },
  },
}));
