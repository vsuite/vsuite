### Trigger

Set the trigger event with the `trigger` attribute, support the event:

- `click` (default)
- `hover`
- `contextMenu`

> Support multiple events: `click, hover, contextMenu`

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
