### Async

<!--start-code-->

```vue
<template>
  <TagPicker
    style="width: 300px"
    :value="value"
    :data="items"
    :cacheData="cacheItems"
    labelKey="login"
    valueKey="id"
    @change="_handleChange"
    @search="_handleSearch"
  >
    <template slot="menu" slot-scope="{ menu }">
      <p v-if="loading" style="padding: 4px; color: #999; text-align: center;">
        <Icon icon="spinner" spin /> Loading...
      </p>
      <template v-else>{{ menu }}</template>
    </template>
  </TagPicker>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

export default {
  data() {
    return {
      value: [],
      items: [],
      cacheItems: [],
      loading: true,
    };
  },

  mounted() {
    this._getUsers('vue');
  },

  methods: {
    _handleChange(val) {
      this.value = val;
    },

    _handleSearch(val) {
      this.loading = true;

      this._getUsers(val || 'vue');
    },

    _getUsers: _.debounce(function(word) {
      axios
        .get('https://api.github.com/search/users', { params: { q: word } })
        .then(({ data }) => {
          this.cacheItems.push(
            ...this.items.filter(x =>
              this.value.some(y => shallowEqual(x.id, y))
            )
          );
          this.items = data.items || [];
          this.loading = false;
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.log('Oops, error', e);

          this.loading = false;
        });
    }),
  },
};
</script>
```

<!--end-code-->
