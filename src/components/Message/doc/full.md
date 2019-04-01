### 消息框撑满容器

<!--start-code-->

```vue
<script>
import Content, { Paragraph } from 'stories/content';
import Message from 'components/Message';

export default {
  components: {
    Content,
    Paragraph,
  },

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
