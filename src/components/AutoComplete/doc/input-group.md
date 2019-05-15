### InputGroup 组合

<!--start-code-->

```vue
<template>
  <div>
    <InputGroup style="width: 300px; margin-bottom: 10px;">
      <AutoComplete :data="list" transfer />
      <InputGroupButton>
        <Icon icon="search" />
      </InputGroupButton>
    </InputGroup>

    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <AutoComplete :data="list" transfer />
      <InputGroupButton>
        <Icon icon="search" />
      </InputGroupButton>
    </InputGroup>

    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <AutoComplete :data="list" transfer />
      <InputGroupAddon>
        <Icon icon="search" />
      </InputGroupAddon>
    </InputGroup>

    <InputGroup inside style="width: 300px; margin-bottom: 10px;">
      <InputGroupAddon>
        <Icon icon="search" />
      </InputGroupAddon>
      <AutoComplete :data="list" transfer />
    </InputGroup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        'HYPER Advertiser',
        'HYPER Web Analytics',
        'HYPER Video Analytics',
        'HYPER DMP',
        'HYPER Ad Serving',
        'HYPER Data Discovery',
      ],
    };
  },
};
</script>
```

<!--end-code-->
