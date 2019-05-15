### 自动补全

<!--start-code-->

```vue
<template>
  <AutoComplete :data="list" placeholder="Email" @change="handleChange" />
</template>

<script>
export default {
  data() {
    return {
      mails: ['@gmail.com', '@sina.com.cn', '@163.com', '@qq.com'],
      list: [],
    };
  },

  methods: {
    handleChange(value) {
      const at = value.match(/@[\S]*/);
      const nextData = at
        ? this.mails
            .filter(item => item.indexOf(at[0]) >= 0)
            .map(item => `${value}${item.replace(at[0], '')}`)
        : this.mails.map(item => `${value}${item}`);

      this.$set(this, 'list', nextData);
    },
  },
};
</script>
```

<!--end-code-->
