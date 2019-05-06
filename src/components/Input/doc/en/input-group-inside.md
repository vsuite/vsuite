### Inside

<!--start-code-->

```vue
<template>
  <div>
    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <Input />
      <InputGroupButton>
        <Icon icon="search" />
      </InputGroupButton>
    </InputGroup>

    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <Input />
      <InputGroupAddon>
        <Icon icon="search" />
      </InputGroupAddon>
    </InputGroup>

    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <InputGroupAddon>$</InputGroupAddon>
      <Input />
      <InputGroupAddon>.00</InputGroupAddon>
    </InputGroup>

    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <InputGroupAddon>
        <Icon icon="avatar" />
      </InputGroupAddon>
      <Input />
    </InputGroup>
  </div>
</template>
```

<!--end-code-->
