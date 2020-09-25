### 禁用状态

可以禁用整个组件，也可以禁用单个选项，只需配置 `disabled` 属性。

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
