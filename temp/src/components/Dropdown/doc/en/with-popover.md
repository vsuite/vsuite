### Used with Popover

<!--start-code-->

```vue
<template>
  <Popover placement="bottom-start" full ref="popover">
    <Button>File</Button>
    <DropdownMenu slot="content" @select="_handleSelect">
      <DropdownItem eventKey="1">New File</DropdownItem>
      <DropdownItem eventKey="2">
        New File with Current Profile
      </DropdownItem>
      <DropdownItem eventKey="3">Download As...</DropdownItem>
      <DropdownItem eventKey="4">Export PDF</DropdownItem>
      <DropdownItem eventKey="5">Export HTML</DropdownItem>
      <DropdownItem eventKey="6">Settings</DropdownItem>
      <DropdownItem eventKey="7">About</DropdownItem>
    </DropdownMenu>
  </Popover>
</template>

<script>
export default {
  methods: {
    _handleSelect() {
      this.$refs.popover.hide();
    },
  },
};
</script>
```

<!--end-code-->
