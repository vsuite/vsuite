import { storiesOf } from '@storybook/vue';

import Dropdown from '@/components/Dropdown';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Demo from 'stories/demo';

const stories = storiesOf('Navigation|Dropdown', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo default="Default">
        <Dropdown title="Default">
          <Dropdown.Item>New File</Dropdown.Item>
          <Dropdown.Item>New File with Current Profile</Dropdown.Item>
          <Dropdown.Item>Download As...</Dropdown.Item>
          <Dropdown.Item>Export PDF</Dropdown.Item>
          <Dropdown.Item>Export HTML</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>About</Dropdown.Item>
        </Dropdown>
      </Demo>
    );
  },
}));

stories.add('trigger', () => ({
  render(h) {
    return (
      <Demo default="Trigger">
        {this._showDropdown(h, 'hover')}
        {this._showDropdown(h, 'click')}
        {this._showDropdown(h, 'right-click')}
        {this._showDropdown(h, 'active')}
        {this._showDropdown(h, 'focus')}
      </Demo>
    );
  },

  methods: {
    _showDropdown(h, trigger) {
      return (
        <Dropdown title={trigger} trigger={trigger}>
          <Dropdown.Item>New File</Dropdown.Item>
          <Dropdown.Item>New File with Current Profile</Dropdown.Item>
          <Dropdown.Item>Download As...</Dropdown.Item>
          <Dropdown.Item>Export PDF</Dropdown.Item>
          <Dropdown.Item>Export HTML</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>About</Dropdown.Item>
        </Dropdown>
      );
    },
  },
}));

stories.add('active', () => ({
  render() {
    return (
      <Demo default="Active">
        <Button.Toolbar>
          <Dropdown title="Default" activeKey="a">
            <Dropdown.Item eventKey="a">Active Item</Dropdown.Item>
            <Dropdown.Item eventKey="b">Item B</Dropdown.Item>
            <Dropdown.Item eventKey="c">Item C</Dropdown.Item>
            <Dropdown.Item eventKey="d">Item D</Dropdown.Item>
          </Dropdown>

          <Dropdown title="Default" activeKey="e-2">
            <Dropdown.Item eventKey="a">Item A</Dropdown.Item>
            <Dropdown.Item eventKey="b">Item B</Dropdown.Item>
            <Dropdown.Item eventKey="c">Item C</Dropdown.Item>
            <Dropdown.Item eventKey="d">Item D</Dropdown.Item>
            <Dropdown.Menu title="Active Menu">
              <Dropdown.Item eventKey="e-1">Item E-1</Dropdown.Item>
              <Dropdown.Item eventKey="e-2">Active Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Button.Toolbar>
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <Button.Toolbar>
          <Dropdown title="Disabled" disabled>
            <Dropdown.Item>Item A</Dropdown.Item>
            <Dropdown.Item>Item B</Dropdown.Item>
            <Dropdown.Item>Item C</Dropdown.Item>
          </Dropdown>

          <Dropdown title="Disabled Item">
            <Dropdown.Item disabled>Disabled Item A</Dropdown.Item>
            <Dropdown.Item disabled>Disabled Item B</Dropdown.Item>
            <Dropdown.Item>Item C</Dropdown.Item>
          </Dropdown>
        </Button.Toolbar>
      </Demo>
    );
  },
}));

stories.add('caret', () => ({
  render() {
    return (
      <Demo title="NoCaret">
        <Dropdown title="Default" noCaret>
          <Dropdown.Item>New File</Dropdown.Item>
          <Dropdown.Item>New File with Current Profile</Dropdown.Item>
          <Dropdown.Item>Download As...</Dropdown.Item>
          <Dropdown.Item>Export PDF</Dropdown.Item>
          <Dropdown.Item>Export HTML</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>About</Dropdown.Item>
        </Dropdown>
      </Demo>
    );
  },
}));

stories.add('icon', () => ({
  render() {
    return (
      <Demo title="Icon">
        <Dropdown title="File" icon="file">
          <Dropdown.Item icon="file">New File</Dropdown.Item>
          <Dropdown.Item icon="file-o">
            New File with Current Profile
          </Dropdown.Item>
          <Dropdown.Item icon="cloud-download">Download As...</Dropdown.Item>
          <Dropdown.Item icon="file-pdf-o">Export PDF</Dropdown.Item>
          <Dropdown.Item icon="html5">Export HTML</Dropdown.Item>
          <Dropdown.Item icon="cog">Settings</Dropdown.Item>
          <Dropdown.Item icon="info">About</Dropdown.Item>
        </Dropdown>
      </Demo>
    );
  },
}));

stories.add('divider & panel', () => ({
  render() {
    return (
      <Demo title="Divider & Panel">
        <Dropdown title="GitHub">
          <Dropdown.Item panel style={{ padding: '10px', width: '160px' }}>
            <p>Signed in as</p>
            <strong>foobar</strong>
          </Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item>Your profile</Dropdown.Item>
          <Dropdown.Item>Your stars</Dropdown.Item>
          <Dropdown.Item>Your Gists</Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item>Help</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  render() {
    const items = [
      <Dropdown.Item>New File</Dropdown.Item>,
      <Dropdown.Item>New File with Current Profile</Dropdown.Item>,
      <Dropdown.Item>Download As...</Dropdown.Item>,
      <Dropdown.Item>Export PDF</Dropdown.Item>,
      <Dropdown.Item>Export HTML</Dropdown.Item>,
      <Dropdown.Item>Settings</Dropdown.Item>,
      <Dropdown.Item>About</Dropdown.Item>,
    ];

    return (
      <Demo title="Placement">
        <table style={{ margin: '100px 0' }}>
          <tbody>
            <tr>
              <td />
              <td>
                <Dropdown title="bottom-start" placement="bottom-start">
                  {items}
                </Dropdown>
              </td>
              <td>
                <Dropdown title="bottom-end" placement="bottom-end">
                  {items}
                </Dropdown>
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <Dropdown title="right-start" placement="right-start">
                  {items}
                </Dropdown>
              </td>
              <td />
              <td />
              <td>
                <Dropdown title="left-start" placement="left-start">
                  {items}
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>
                <Dropdown title="right-end" placement="right-end">
                  {items}
                </Dropdown>
              </td>
              <td />
              <td />
              <td>
                <Dropdown title="left-end" placement="left-end">
                  {items}
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <Dropdown title="top-start" placement="top-start">
                  {items}
                </Dropdown>
              </td>
              <td>
                <Dropdown title="top-end" placement="top-end">
                  {items}
                </Dropdown>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },
}));

stories.add('multi-level', () => ({
  render() {
    return (
      <Demo title="Multi-Level">
        <Button.Toolbar
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Dropdown title="Dropdown">
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Menu title="Right Item 2">
              <Dropdown.Menu title="Item 2-1">
                <Dropdown.Item>Item 2-1-1</Dropdown.Item>
                <Dropdown.Item active>Item 2-1-2</Dropdown.Item>
                <Dropdown.Item>Item 2-1-3</Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Item>Item 2-2</Dropdown.Item>
              <Dropdown.Item>Item 2-3</Dropdown.Item>
            </Dropdown.Menu>
            <Dropdown.Menu title="Left Item 3" pullLeft>
              <Dropdown.Menu title="Item 3-1" pullLeft>
                <Dropdown.Item>Item 3-1-1</Dropdown.Item>
                <Dropdown.Item active>Item 3-1-2</Dropdown.Item>
                <Dropdown.Item>Item 3-1-3</Dropdown.Item>
              </Dropdown.Menu>
              <Dropdown.Item>Item 3-2</Dropdown.Item>
              <Dropdown.Item>Item 3-3</Dropdown.Item>
            </Dropdown.Menu>
            <Dropdown.Item>Item 4</Dropdown.Item>
            <Dropdown.Item>Item 5</Dropdown.Item>
            <Dropdown.Item>Item 6</Dropdown.Item>
          </Dropdown>
        </Button.Toolbar>
      </Demo>
    );
  },
}));

stories.add('custom', () => ({
  render() {
    return (
      <Demo title="Custom">
        <Button.Toolbar>
          <Dropdown title="More...">
            <Dropdown.Item>
              <Icon icon="edit2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon icon="eye" /> View
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon icon="trash" /> Delete
            </Dropdown.Item>
          </Dropdown>

          <Dropdown>
            <Button appearance="primary" slot="title">
              New
            </Button>
            <Dropdown.Item>
              <Icon icon="user" /> New User
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon icon="group" /> New Group
            </Dropdown.Item>
          </Dropdown>
          <Dropdown>
            <Button.Icon appearance="primary" icon="plus" circle slot="title" />
            <Dropdown.Item>
              <Icon icon="user" /> New User
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon icon="group" /> New Group
            </Dropdown.Item>
          </Dropdown>
        </Button.Toolbar>
      </Demo>
    );
  },
}));

stories.add('composition', () => ({
  render() {
    return (
      <Demo title="Composition">
        <Button.Toolbar>
          <Dropdown
            title="Save"
            appearance="default"
            toggleComponentClass={Button}
          >
            <Dropdown.Item>Save as...</Dropdown.Item>
            <Dropdown.Item>Save & New</Dropdown.Item>
          </Dropdown>

          <Button.Group>
            <Button>Save</Button>
            <Dropdown placement="bottom-end">
              <Button.Icon icon="angle-double-down" slot="title" />
              <Dropdown.Item icon="save">Save as...</Dropdown.Item>
              <Dropdown.Item icon="save">Save & New</Dropdown.Item>
            </Dropdown>
          </Button.Group>

          <Dropdown>
            <Button.Icon icon="plus" placement="left" slot="title">
              New
            </Button.Icon>
            <Dropdown.Item icon="user">New User</Dropdown.Item>
            <Dropdown.Item icon="group">New Group</Dropdown.Item>
            <Dropdown.Menu icon="group" title="More">
              <Dropdown.Item icon="user">New User</Dropdown.Item>
              <Dropdown.Item icon="group">New Group</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Button.Toolbar>
      </Demo>
    );
  },
}));

stories.add('menu', () => ({
  render() {
    return (
      <Demo title="Menu">
        <Dropdown.Menu
          style={{
            width: '200px',
            border: '1px solid #ddd',
          }}
        >
          <Dropdown.Item>New File</Dropdown.Item>
          <Dropdown.Item>New File with Current Profile</Dropdown.Item>
          <Dropdown.Item>Download As...</Dropdown.Item>
          <Dropdown.Item>Export PDF</Dropdown.Item>
          <Dropdown.Item>Export HTML</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>About</Dropdown.Item>
          <Dropdown.Menu icon="group" title="More">
            <Dropdown.Item icon="user">New User</Dropdown.Item>
            <Dropdown.Item icon="group">New Group</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Demo>
    );
  },
}));

stories.add('& popper', () => ({
  render() {
    return (
      <Demo title="& Popper">
        <Popover placement="bottom-start" full ref="popover">
          <Button>File</Button>
          <Dropdown.Menu slot="content" onSelect={this._handleSelect}>
            <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
            <Dropdown.Item eventKey={2}>
              New File with Current Profile
            </Dropdown.Item>
            <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
            <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
            <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
            <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
            <Dropdown.Item eventKey={7}>About</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      </Demo>
    );
  },

  methods: {
    _handleSelect() {
      this.$refs.popover.hide();
    },
  },
}));
