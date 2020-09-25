### 设置图标

<!--start-code-->

```vue
<template>
  <Nav>
    <NavItem icon="facebook-square">facebook</NavItem>
    <NavItem icon="github-alt">github</NavItem>
    <NavItem icon="circle">amazon</NavItem>
    <NavItem icon="chrome">chrome</NavItem>
    <Dropdown icon="ellipsis-h" title="more...">
      <DropdownItem icon="dropbox">dropbox</DropdownItem>
      <DropdownItem icon="firefox">firefox</DropdownItem>
      <DropdownItem icon="gitlab">gitlab</DropdownItem>
      <DropdownItem icon="linux">linux</DropdownItem>
    </Dropdown>
  </Nav>
</template>
```

<!--end-code-->
