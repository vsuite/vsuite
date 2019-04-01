### Full

<!--start-code-->

```vue
<template>
  <Content :style="styles">
    <Message full showIcon type="warning" description="Warning" />
    <Paragraph />
  </Content>
</template>

<script>
import Content, { Paragraph } from 'stories/content';

export default {
  components: {
    Content,
    Paragraph,
  },

  data() {
    return {
      styles: {
        background: '#000',
        padding: '20px',
        position: 'relative',
      },
    };
  },
};
</script>
```

<!--end-code-->
