<template>
  <div>
    <div class='field'>
      <label class='label'>School Name</label>
      <div class='control'>
        <input class='input' type='text' v-model='school.SchoolName' placeholder='Seneca College'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>School Location</label>
      <div class='control'>
        <input class='input' type='text' v-model='school.SchoolLocation' placeholder='Toronto, ON'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>Degree</label>
      <div class='control'>
        <input class='input' type='text' v-model='school.Degree' placeholder='Bachelor of Technology'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>Major</label>
      <div class='control'>
        <input class='input' type='text' v-model='school.Major' placeholder='Software Development'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>GPA</label>
      <div class='control'>
        <input class='input' type='text' v-model='school.Gpa' placeholder='4.0'>
      </div>
    </div>

    <div class='field'>
      <label class='label'>Graduation Date</label>
      <div class='control'>
        <input class='input' type='text' v-model='school.GraduationDate' placeholder='April 2019'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>

</style>
