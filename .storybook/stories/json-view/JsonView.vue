<template>
  <Panel class="vs-json-view" :header="title">
    <tree-view v-bind="$attrs" V-on="$listeners" />
  </Panel>
</template>

<script>
import Panel from 'components/Panel';

export default {
  name: 'JsonView',

  components: { Panel },

  props: {
    title: String,
  },
};
</script>

<style scoped>
.vs-json-view {
  background: #002b36 !important;
  margin-bottom: 20px !important;
}

.vs-json-view >>> .vs-panel-heading {
  background: #06232c;
  border-radius: 6px;
  color: #fff;
}

.vs-json-view >>> .tree-view-item-key {
  color: rgb(38, 139, 210);
}

.vs-json-view >>> .tree-view-item-key-with-chevron::before {
  color: rgb(38, 139, 210);
}

.vs-json-view >>> .tree-view-item-value {
  color: rgb(133, 153, 0);
}
</style>
