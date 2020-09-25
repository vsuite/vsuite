### Diasbled State

You can disable the entire component or disable individual options by configuring the `disabled` property.

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Dropdown title="Disabled" disabled>
      <DropdownItem>Item A</DropdownItem>
      <DropdownItem>Item B</DropdownItem>
      <DropdownItem>Item C</DropdownItem>
    </Dropdown>

    <Dropdown title="Disabled Item">
      <DropdownItem disabled>Disabled Item A</DropdownItem>
      <DropdownItem disabled>Disabled Item B</DropdownItem>
      <DropdownItem>Item C</DropdownItem>
    </Dropdown>
  </ButtonToolbar>
</template>
```

<!--end-code-->
