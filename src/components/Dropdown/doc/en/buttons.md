### Used with Buttons

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Dropdown title="Save" appearance="default">
      <DropdownItem>Save as...</DropdownItem>
      <DropdownItem>Save & New</DropdownItem>
    </Dropdown>

    <ButtonGroup>
      <Button>Save</Button>
      <Dropdown placement="bottom-end">
        <IconButton icon="angle-double-down" slot="title" />
        <DropdownItem icon="save">Save as...</DropdownItem>
        <DropdownItem icon="save">Save & New</DropdownItem>
      </Dropdown>
    </ButtonGroup>

    <Dropdown>
      <IconButton icon="plus" placement="left" slot="title">
        New
      </IconButton>
      <DropdownItem icon="user">New User</DropdownItem>
      <DropdownItem icon="group">New Group</DropdownItem>
      <DropdownMenu icon="group" title="More">
        <DropdownItem icon="user">New User</DropdownItem>
        <DropdownItem icon="group">New Group</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </ButtonToolbar>
</template>
```

<!--end-code-->
