### Appearance

`appearance` values include:

- 'default'
- 'inverse'
- 'subtle'

<!--start-code-->

```vue
<template>
  <div>
    <Navbar>
      <a href="#" class="navbar-brand" slot="header">
        VSUITE
      </a>
      <Nav @select="_handleSelect" :activeKey="activeKey">
        <NavItem eventKey="1" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="2">News</NavItem>
        <NavItem eventKey="3">Products</NavItem>
        <Dropdown title="About">
          <DropdownItem eventKey="4">Company</DropdownItem>
          <DropdownItem eventKey="5">Team</DropdownItem>
          <DropdownItem eventKey="6">Contact</DropdownItem>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <NavItem icon="cog">Settings</NavItem>
      </Nav>
    </Navbar>
    <hr />
    <Navbar appearance="inverse">
      <a href="#" class="navbar-brand" slot="header">
        VSUITE
      </a>
      <Nav @select="_handleSelect" :activeKey="activeKey">
        <NavItem eventKey="1" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="2">News</NavItem>
        <NavItem eventKey="3">Products</NavItem>
        <Dropdown title="About">
          <DropdownItem eventKey="4">Company</DropdownItem>
          <DropdownItem eventKey="5">Team</DropdownItem>
          <DropdownItem eventKey="6">Contact</DropdownItem>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <NavItem icon="cog">Settings</NavItem>
      </Nav>
    </Navbar>
    <hr />
    <Navbar appearance="subtle">
      <a href="#" class="navbar-brand" slot="header">
        VSUITE
      </a>
      <Nav @select="_handleSelect" :activeKey="activeKey">
        <NavItem eventKey="1" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="2">News</NavItem>
        <NavItem eventKey="3">Products</NavItem>
        <Dropdown title="About">
          <DropdownItem eventKey="4">Company</DropdownItem>
          <DropdownItem eventKey="5">Team</DropdownItem>
          <DropdownItem eventKey="6">Contact</DropdownItem>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <NavItem icon="cog">Settings</NavItem>
      </Nav>
    </Navbar>
  </div>
</template>

<script>
export default {
  data() {
    return { activeKey: null };
  },

  methods: {
    _handleSelect(key) {
      this.activeKey = key;
    },
  },
};
</script>
```

<!--end-code-->
