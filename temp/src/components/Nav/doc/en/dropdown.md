### Multi-level navigation

<!--start-code-->

```vue
<template>
  <Nav>
    <NavItem active>Item A</NavItem>
    <NavItem>Item B</NavItem>
    <NavItem>Item C</NavItem>
    <NavItem>Item D</NavItem>
    <Dropdown title="Item E">
      <DropdownItem>Item E-1</DropdownItem>
      <DropdownItem>Item E-2</DropdownItem>
      <DropdownItem>Item E-3</DropdownItem>
      <DropdownItem>Item E-4</DropdownItem>
      <DropdownMenu title="Item E-4">
        <DropdownItem>Item E-4-1</DropdownItem>
        <DropdownItem active>Item E-4-2</DropdownItem>
        <DropdownItem>Item E-4-3</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Nav>
</template>
```

<!--end-code-->

> Use the `<Dropdown>` component directly when using multi-level navigation.
