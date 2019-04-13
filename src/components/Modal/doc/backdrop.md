### 背景板

当设置为 true，Modal 打开时会显示背景，点击背景会关闭 Modal，如果不想关闭 Modal，可以设置为 'static'

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen(true)">true</Button>
      <Button @click="_handleOpen(false)">false</Button>
      <Button @click="_handleOpen('static')">static</Button>
    </ButtonToolbar>

    <Modal v-model="visible" title="Modal Title" :backdrop="backdrop">
      <vs-content-paragraph size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      backdrop: true,
    };
  },

  methods: {
    _handleOpen(backdrop) {
      this.visible = true;
      this.backdrop = backdrop;
    },
  },
};
</script>
```

<!--end-code-->
