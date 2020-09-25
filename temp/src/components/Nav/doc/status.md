### 设置选项状态

- active 激活
- disabled 禁用

<!--start-code-->

```vue
<template>
  <div>
    <Nav>
      <NavItem>Default Item</NavItem>
      <NavItem active>Active Item</NavItem>
      <NavItem disabled>Disabled Item</NavItem>
    </Nav>
    <br />
    <Nav appearance="tabs">
      <NavItem>Default Item</NavItem>
      <NavItem active>Active Item</NavItem>
      <NavItem disabled>Disabled Item</NavItem>
    </Nav>
    <br />
    <Nav appearance="subtle">
      <NavItem>Default Item</NavItem>
      <NavItem active>Active Item</NavItem>
      <NavItem disabled>Disabled Item</NavItem>
    </Nav>
  </div>
</template>
```

<!--end-code-->
