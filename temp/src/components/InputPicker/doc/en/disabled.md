### Disabled

<!--start-code-->

```vue
<template>
  <div>
    <InputPicker
      :data="data"
      defaultValue="Julius"
      disabled
      style="width: 224px;"
    />

    <hr />

    <p>Disabled Options</p>
    <InputPicker
      :data="data"
      defaultValue="Julius"
      :disabledItemValues="['Eugenia', 'Travon', 'Vincenza']"
      style="width: 224px;"
    />
  </div>
</template>

<script>
import data from 'stories/data/user';

export default {
  data() {
    return { data };
  },
};
</script>
```

<!--end-code-->
