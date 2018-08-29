import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

import Toggle from 'components/Toggle';
import Dropdown from 'components/Dropdown';
import Sidenav from 'components/Sidenav';
import Nav from 'components/Nav';

const stories = storiesOf('Navigation|Sidenav', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <div style={{ width: '250px' }}>
          <Sidenav defaultOpenKeys={['3', '4']}>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" icon="dashboard">
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon="group">
                  User Group
                </Nav.Item>
                <Dropdown eventKey="3" title="Advanced" icon="magic">
                  <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                  <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                  <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                  <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                </Dropdown>
                <Dropdown eventKey="4" title="Settings" icon="gear-circle">
                  <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                  <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                  <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                  <Dropdown.Menu eventKey="4-5" title="Custom Action">
                    <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                    <Dropdown.Item eventKey="4-5-2">
                      Action Params
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render(h) {
    return (
      <Demo title="Appearance">
        {this._renderSidenav(h)}
        {this._renderSidenav(h, 'inverse')}
        {this._renderSidenav(h, 'subtle')}
      </Demo>
    );
  },

  methods: {
    _renderSidenav(h, appearance) {
      const styles = {
        width: '250px',
        display: 'inline-table',
        marginRight: '10px',
      };

      return (
        <div style={styles}>
          <Sidenav appearance={appearance} defaultOpenKeys={['3', '4']}>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon="dashboard">
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon="group">
                  User Group
                </Nav.Item>
                <Dropdown eventKey="3" title="Advanced" icon="magic">
                  <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                  <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                  <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                  <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                </Dropdown>
                <Dropdown eventKey="4" title="Settings" icon="gear-circle">
                  <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                  <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                  <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                  <Dropdown.Menu eventKey="4-5" title="Custom Action">
                    <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                    <Dropdown.Item eventKey="4-5-2">
                      Action Params
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      );
    },
  },
}));

stories.add('expanded', () => ({
  data() {
    return {
      openKeys: ['3', '4'],
      expanded: true,
      activeKey: null,
    };
  },

  render(h) {
    return (
      <Demo title="Expanded">
        <Toggle onChange={this._handleToggle} checked={this.expanded} />
        <hr />
        {this._renderSidenav(h)}
        {this._renderSidenav(h, 'inverse')}
        {this._renderSidenav(h, 'subtle')}
      </Demo>
    );
  },

  methods: {
    _renderSidenav(h, appearance) {
      return (
        <div
          style={{ display: 'inline-block', width: '250px', margin: '10px' }}
        >
          <Sidenav
            appearance={appearance}
            expanded={this.expanded}
            openKeys={this.openKeys}
            activeKey={this.activeKey}
            onSelect={this._handleSelect}
            onOpenChange={this._handleOpenChange}
          >
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" icon="dashboard">
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon="group">
                  User Group
                </Nav.Item>
                <Dropdown
                  eventKey="3"
                  title="Advanced"
                  icon="magic"
                  placement="right-start"
                >
                  <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                  <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                  <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                  <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                </Dropdown>
                <Dropdown
                  eventKey="4"
                  title="Settings"
                  icon="gear-circle"
                  placement="right-start"
                >
                  <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                  <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                  <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                  <Dropdown.Menu eventKey="4-5" title="Custom Action">
                    <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                    <Dropdown.Item eventKey="4-5-2">
                      Action Params
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      );
    },

    _handleToggle() {
      this.expanded = !this.expanded;
    },

    _handleSelect(eventKey) {
      this.activeKey = eventKey;
    },

    _handleOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
  },
}));
