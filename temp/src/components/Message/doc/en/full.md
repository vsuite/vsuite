### Full

<!--start-code-->

```vue
<script>
import Content, { Paragraph } from 'stories/content/Content.vue';
import Message from 'components/Message';

export default {
  render() {
    return (
      <Content
        style={{
          background: '#000',
          padding: '20px',
          position: 'relative',
        }}
      >
        <Message full showIcon type="warning" description="Warning" />
        <Paragraph />
      </Content>
    );
  },
};
</script>
```

<!--end-code-->
