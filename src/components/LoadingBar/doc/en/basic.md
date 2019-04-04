### Basic

<!--start-code-->

```vue
<script>
import Button from 'components/Button';

export default {
  render() {
    this.$Loading.destroy();
    this.$Loading.config({ progress: false });

    return (
      <Button.Group>
        <Button onClick={() => this.$Loading.start()}>开始加载</Button>
        <Button onClick={() => this.$Loading.finish()}>加载完毕</Button>
        <Button onClick={() => this.$Loading.error()}>加载失败</Button>
      </Button.Group>
    );
  },
};
</script>
```

<!--end-code-->
