### 受控的 Checkbox 组

<!--start-code-->

```vue
<template>
  <CheckboxGroup inline :value="['A', 'C']">
    <Checkbox value="A">Item A</Checkbox>
    <Checkbox value="B">Item B</Checkbox>
    <Checkbox value="C">Item C</Checkbox>
    <Checkbox value="D" disabled>
      Item D
    </Checkbox>
  </CheckboxGroup>
</template>
```

<!--end-code-->
