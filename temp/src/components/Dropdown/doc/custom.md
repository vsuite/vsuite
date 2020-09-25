### 自定义

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Dropdown title="More...">
      <DropdownItem> <Icon icon="edit2" /> Edit </DropdownItem>
      <DropdownItem> <Icon icon="eye" /> View </DropdownItem>
      <DropdownItem> <Icon icon="trash" /> Delete </DropdownItem>
    </Dropdown>

    <Dropdown>
      <Button appearance="primary" slot="title">
        New
      </Button>
      <DropdownItem> <Icon icon="user" /> New User </DropdownItem>
      <DropdownItem> <Icon icon="group" /> New Group </DropdownItem>
    </Dropdown>
    <Dropdown>
      <IconButton appearance="primary" icon="plus" circle slot="title" />
      <DropdownItem> <Icon icon="user" /> New User </DropdownItem>
      <DropdownItem> <Icon icon="group" /> New Group </DropdownItem>
    </Dropdown>
  </ButtonToolbar>
</template>
```

<!--end-code-->
