### 位置

<!--start-code-->

```vue
<template>
  <div>
    <table id="customTable">
      <tbody>
        <tr>
          <td />
          <td>
            <CheckPicker
              :data="data"
              placement="bottom-start"
              placeholder="bottom-start"
            />
          </td>
          <td>
            <CheckPicker
              :data="data"
              placement="bottom-end"
              placeholder="bottom-end"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <CheckPicker
              :data="data"
              placement="right-start"
              placeholder="right-start"
            />
          </td>
          <td />
          <td />
          <td>
            <CheckPicker
              :data="data"
              placement="left-start"
              placeholder="left-start"
            />
          </td>
        </tr>
        <tr>
          <td>
            <CheckPicker
              :data="data"
              placement="right-end"
              placeholder="right-end"
            />
          </td>
          <td />
          <td />
          <td>
            <CheckPicker
              :data="data"
              placement="left-end"
              placeholder="left-end"
            />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <CheckPicker
              :data="data"
              placement="top-start"
              placeholder="top-start"
            />
          </td>
          <td>
            <CheckPicker
              :data="data"
              placement="top-end"
              placeholder="top-end"
            />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
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

> 提示：设置为 `auto*`时， 尝试滚动页面，或者改变浏览器大小，会自动显示在合适的位置。
