### 触发事件

通过 `trigger` 属性设置触发事件，支持事件:

- `click` (默认值)
- `hover`
- `contextMenu`

> 同时支持多个事件 `click, hover, contextMenu`

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Dropdown title="hover" trigger="hover">
      <DropdownItem>New File</DropdownItem>
      <DropdownItem>New File with Current Profile</DropdownItem>
      <DropdownItem>Download As...</DropdownItem>
      <DropdownItem>Export PDF</DropdownItem>
      <DropdownItem>Export HTML</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>About</DropdownItem>
    </Dropdown>

    <Dropdown title="click" trigger="click">
      <DropdownItem>New File</DropdownItem>
      <DropdownItem>New File with Current Profile</DropdownItem>
      <DropdownItem>Download As...</DropdownItem>
      <DropdownItem>Export PDF</DropdownItem>
      <DropdownItem>Export HTML</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>About</DropdownItem>
    </Dropdown>

    <Dropdown title="right-click" trigger="right-click">
      <DropdownItem>New File</DropdownItem>
      <DropdownItem>New File with Current Profile</DropdownItem>
      <DropdownItem>Download As...</DropdownItem>
      <DropdownItem>Export PDF</DropdownItem>
      <DropdownItem>Export HTML</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>About</DropdownItem>
    </Dropdown>

    <Dropdown title="active" trigger="active">
      <DropdownItem>New File</DropdownItem>
      <DropdownItem>New File with Current Profile</DropdownItem>
      <DropdownItem>Download As...</DropdownItem>
      <DropdownItem>Export PDF</DropdownItem>
      <DropdownItem>Export HTML</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>About</DropdownItem>
    </Dropdown>

    <Dropdown title="focus" trigger="focus">
      <DropdownItem>New File</DropdownItem>
      <DropdownItem>New File with Current Profile</DropdownItem>
      <DropdownItem>Download As...</DropdownItem>
      <DropdownItem>Export PDF</DropdownItem>
      <DropdownItem>Export HTML</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>About</DropdownItem>
    </Dropdown>
  </ButtonToolbar>
</template>
```

<!--end-code-->
