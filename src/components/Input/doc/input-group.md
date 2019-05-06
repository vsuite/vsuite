### 输入框组合

<!--start-code-->

```vue
<template>
  <div>
    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <InputGroupAddon> @</InputGroupAddon>
      <Input />
    </InputGroup>

    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <Input />
      <InputGroupAddon>.com</InputGroupAddon>
    </InputGroup>

    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <InputGroupAddon>$</InputGroupAddon>
      <InputNumber />
      <InputGroupAddon>.00</InputGroupAddon>
    </InputGroup>

    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <Input />
      <InputGroupAddon>to</InputGroupAddon>
      <Input />
    </InputGroup>

    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <Input />
      <InputGroupAddon>
        <Icon icon="search" />
      </InputGroupAddon>
    </InputGroup>

    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <InputGroupAddon>
        <Icon icon="avatar" />
      </InputGroupAddon>
      <Input />
    </InputGroup>
  </div>
</template>
```

<!--end-code-->
