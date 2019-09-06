<template>
  <div id='app'>
    <Pageheader/>
    <router-view/>
  </div>
</template>

<script>
import Pageheader from '@/components/Header';

export default {
  name: 'app',
  components: {
    Pageheader
  }
};
</script>

<style scoped>

</style>