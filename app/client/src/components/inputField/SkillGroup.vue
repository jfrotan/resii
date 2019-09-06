<template>
  <div>
    <div class='field'>
        <label class='label'>Skill Group Name</label>
        <div class='control'>
            <input class='input' type='text' v-model='group.Name' placeholder='Languages' />
        </div>
        </div>

        <div class='field'>
        <label class='label'>Skill Group Description</label>
        <div class='control'>
            <input class='input' type='text' v-model='group.Description' placeholder='C++, Java, Python, JavaScript' />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      // Defines the prop as an Object, that may contain other data members.
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
