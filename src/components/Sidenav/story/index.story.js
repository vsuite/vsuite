import { storiesOf } from '@storybook/vue';

import Dropdown from 'components/Dropdown';
import Sidenav from 'components/Sidenav';
import Button from 'components/Button';
import Nav from 'components/Nav';
import Demo from 'stories/demo';

const stories = storiesOf('Navigation|Sidenav', module);

stories.add('basic', () => ({
  render() {
    return (
      <Demo title="Basic">
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
        margin: '0 10px 50px 0',
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
        <Button.Group>
          <Button appearance="primary" onClick={this._handleOpen}>
            展开
          </Button>
          <Button appearance="primary" onClick={this._handleClose}>
            收起
          </Button>
        </Button.Group>
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
          style={{
            display: 'inline-block',
            width: '250px',
            margin: '0 10px 50px 0',
          }}
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

    _handleOpen() {
      this.expanded = true;
    },

    _handleClose() {
      this.expanded = false;
    },

    _handleSelect(eventKey) {
      this.activeKey = eventKey;
    },

    _handleOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
  },
}));

stories.add('custom', () => ({
  render() {
    const panelStyles = {
      padding: '15px 20px',
      color: '#aaa',
    };

    const headerStyles = {
      padding: '20px',
      fontSize: '16px',
      background: '#34c3ff',
      color: ' #fff',
    };

    return (
      <Demo title="Custom">
        <div style={{ width: '250px' }}>
          <Sidenav defaultOpenKeys={['3', '4']}>
            <Sidenav.Header>
              <div style={headerStyles}>Custom Sidenav</div>
            </Sidenav.Header>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon="dashboard">
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon="group">
                  User Group
                </Nav.Item>
                <Dropdown eventKey="3" title="Advanced" icon="magic">
                  <Dropdown.Item divider />
                  <Dropdown.Item panel style={panelStyles}>
                    Reports
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                  <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                  <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                  <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item panel style={panelStyles}>
                    Settings
                  </Dropdown.Item>
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
