### Textarea

<!--start-code-->

```vue
<template>
  <div>
    <Input
      style="width: 300px"
      :rows="3"
      componentClass="textarea"
      placeholder="Textarea"
    />

    <hr />

    <Input
      style="width: 300px; resize: vertical"
      componentClass="textarea"
      :rows="3"
      placeholder="resize: 'vertical'"
    />
  </div>
</template>
```

<!--end-code-->
