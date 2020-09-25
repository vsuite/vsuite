### 动态添加标签

<!--start-code-->

```vue
<template>
  <TagGroup>
    <Tag
      v-for="(item, index) in tags"
      :key="index"
      closable
      @close="_handleTagRemove(item)"
    >
      {{ item }}
    </Tag>
    <Input
      v-if="typing"
      style="display: inline-block; margin-left: 10px; width: 70px;"
      ref="input"
      size="xs"
      v-model="inputVal"
      @blur="_handleInputConfirm"
      @ressEnter="_handleInputConfirm"
    />
    <IconButton
      v-else
      style="display: inline-block; margin-left: 10px;"
      icon="plus"
      appearance="ghost"
      size="xs"
      @click="_handleButtonClick"
    />
  </TagGroup>
</template>

<script>
export default {
  data() {
    return {
      typing: false,
      inputVal: '',
      tags: ['javascript', 'css', 'vue'],
    };
  },

  methods: {
    _handleTagRemove(tag) {
      const index = this.tags.indexOf(tag);

      if (index === -1) return;

      this.tags.splice(index, 1);
    },

    _handleButtonClick() {
      this.typing = true;

      this.$nextTick(() => this.$refs.input.focus());
    },

    _handleInputConfirm() {
      this.typing = false;

      if (!this.inputVal) return;

      this.tags.push(this.inputVal);
      this.inputVal = '';
    },
  },
};
</script>
```

<!--end-code-->
