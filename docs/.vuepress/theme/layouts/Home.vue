<template>
  <div class="container">
    <img width="122" height="122" :src="$withBase('/logo.png')" alt="bcflow-logo">
    <h1>{{$title}}</h1>
    <p>{{$description}}</p>
    <p>Coming Soon...</p>
  </div>
</template>

<script>
  export default {
    name: 'HomeLayout',

    mounted() {
      console.dir(this);
    },
  }
</script>

<style lang="less">
  .container {
    margin: 50px;
    text-align: center;
  }
</style>
