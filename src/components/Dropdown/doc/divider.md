### 分割线与面板

- `divider` 设置分割选项。
- `panel` 设置一个面板。

<!--start-code-->

```vue
<template>
  <Dropdown title="GitHub">
    <DropdownItem panel style="padding: 10px; width: 160px;">
      <p>Signed in as</p>
      <strong>foobar</strong>
    </DropdownItem>
    <DropdownItem divider />
    <DropdownItem>Your profile</DropdownItem>
    <DropdownItem>Your stars</DropdownItem>
    <DropdownItem>Your Gists</DropdownItem>
    <DropdownItem divider />
    <DropdownItem>Help</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
</template>
```

<!--end-code-->
