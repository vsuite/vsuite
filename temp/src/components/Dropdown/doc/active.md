### 选项激活状态

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Dropdown title="Default" activeKey="a">
      <DropdownItem eventKey="a">Active Item</DropdownItem>
      <DropdownItem eventKey="b">Item B</DropdownItem>
      <DropdownItem eventKey="c">Item C</DropdownItem>
      <DropdownItem eventKey="d">Item D</DropdownItem>
    </Dropdown>

    <Dropdown title="Default" activeKey="e-2">
      <DropdownItem eventKey="a">Item A</DropdownItem>
      <DropdownItem eventKey="b">Item B</DropdownItem>
      <DropdownItem eventKey="c">Item C</DropdownItem>
      <DropdownItem eventKey="d">Item D</DropdownItem>
      <DropdownMenu eventKey="e" title="Active Menu">
        <DropdownItem eventKey="e-1">Item E-1</DropdownItem>
        <DropdownItem eventKey="e-2">Active Item</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </ButtonToolbar>
</template>
```

<!--end-code-->
