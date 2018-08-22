import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import ButtonToolbar from 'components/ButtonToolbar';
import Dropdown from 'components/Dropdown';

const stories = storiesOf('Data Entry|Dropdown', module);

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
        <ButtonToolbar>
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
        </ButtonToolbar>
      </Demo>
    );
  },
}));
