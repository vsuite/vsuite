### 默认

<!--start-code-->

```vue
<template>
  <Navbar>
    <NavbarHeader>
      <a href="#" class="navbar-brand">
        VSUITE
      </a>
    </NavbarHeader>
    <NavbarBody>
      <Nav>
        <NavItem icon="home">Home</NavItem>
        <NavItem>News</NavItem>
        <NavItem>Products</NavItem>
        <Dropdown title="About">
          <DropdownItem>Company</DropdownItem>
          <DropdownItem>Team</DropdownItem>
          <DropdownItem>Contact</DropdownItem>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <NavItem icon="cog">Settings</NavItem>
      </Nav>
    </NavbarBody>
  </Navbar>
</template>
```

<!--end-code-->
