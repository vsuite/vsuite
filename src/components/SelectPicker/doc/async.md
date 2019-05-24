### 异步

<!--start-code-->

```vue
<template>
  <SelectPicker
    style="width: 224px;"
    :data="items"
    labelKey="login"
    valueKey="id"
    @search="_handleSearch"
  >
    <template slot="menu" slot-scope="{ menu }">
      <p style="padding: 4px; color: #999; text-align: center;" v-if="loading">
        <Icon icon="spinner" spin /> Loading...
      </p>
      <template v-else>
        {{ menu }}
      </template>
    </template>
  </SelectPicker>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  data() {
    return {
      items: [],
      loading: true,
    };
  },

  mounted() {
    this._getUsers('vue');
  },

  methods: {
    _handleSearch(val) {
      this.loading = true;

      this._getUsers(val || 'vue');
    },

    _getUsers: _.debounce(function(word) {
      axios
        .get('https://api.github.com/search/users', { params: { q: word } })
        .then(({ data }) => {
          this.items = data.items || [];
          this.loading = false;
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.log('Oops, error', e);

          this.loading = false;
        });
    }, 300),
  },
};
</script>
```

<!--end-code-->
