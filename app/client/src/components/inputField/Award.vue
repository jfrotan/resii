<template>
  <div>
    <div class='field'>
      <label class='label'>Award Name</label>
      <div class='control'>
        <input class='input' type='text' v-model='awd.Name' placeholder='Award name'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>Award Description</label>
      <div class='control'>
        <input class='textarea' v-model='awd.Description' placeholder='Award description' />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    awd: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style>

</style>