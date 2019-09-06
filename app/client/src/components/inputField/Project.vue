<template>
  <div>
    <div class='field'>
      <label class='label'>Project Name</label>
      <div class='control'>
        <input class='input' type='text' v-model='proj.Name' placeholder='Rosie'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>Project Description</label>
      <div class='control'>
        <input class='textarea' v-model='proj.Description' placeholder='An AI assistant designed to listen and take detailed notes by utilizing IBM Watson for speech processing and TensorFlow for Machine Learning.'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>Url</label>
      <div class='control'>
        <input class='input' type='text' v-model='proj.Url' placeholder='github.com/Sean/Rosie'>
      </div>
    </div>
    <div class='field'>
      <label class='label'>Technologies used</label>
      <div class='control'>
        <input class='input' type='text' v-model='proj.Technologies' placeholder='Node.js, Angular, IBM Watson, TensorFlow'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proj: {
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
