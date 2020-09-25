### Submenu

<!--start-code-->

```vue
<template>
  <ButtonToolbar
    style="display: flex; flex-direction: row; justify-content: center;"
  >
    <Dropdown title="Dropdown">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownMenu title="Right Item 2">
        <DropdownMenu title="Item 2-1">
          <DropdownItem>Item 2-1-1</DropdownItem>
          <DropdownItem active>Item 2-1-2</DropdownItem>
          <DropdownItem>Item 2-1-3</DropdownItem>
        </DropdownMenu>
        <DropdownItem>Item 2-2</DropdownItem>
        <DropdownItem>Item 2-3</DropdownItem>
      </DropdownMenu>
      <DropdownMenu title="Left Item 3" pullLeft>
        <DropdownMenu title="Item 3-1" pullLeft>
          <DropdownItem>Item 3-1-1</DropdownItem>
          <DropdownItem active>Item 3-1-2</DropdownItem>
          <DropdownItem>Item 3-1-3</DropdownItem>
        </DropdownMenu>
        <DropdownItem>Item 3-2</DropdownItem>
        <DropdownItem>Item 3-3</DropdownItem>
      </DropdownMenu>
      <DropdownItem>Item 4</DropdownItem>
      <DropdownItem>Item 5</DropdownItem>
      <DropdownItem>Item 6</DropdownItem>
    </Dropdown>
  </ButtonToolbar>
</template>
```

<!--end-code-->
