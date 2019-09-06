<template>
  <div>
    <div class='field'>
      <label class='label'>Company Name</label>
      <div class='control'>
          <input class='input' type='text' v-model='work.CompanyName' placeholder='Google'>
      </div>
      </div>

      <div class='field'>
      <label class='label'>Job Location</label>
      <div class='control'>
          <input class='input' type='text' v-model='work.JobLocation' placeholder='Waterloo, ON'>
      </div>
      </div>

      <div class='field'>
      <label class='label'>Job Title</label>
      <div class='control'>
          <input class='input' type='text' v-model='work.JobTitle' placeholder='Software Engineer'>
      </div>
      </div>

      <div class='field'>
      <label class='label'>Job Start Date</label>
      <div class='control'>
          <input class='input' type='text' v-model='work.JobStartDate' placeholder='May 2018'>
      </div>
      </div>

      <div class='field'>
      <label class='label'>Job End Date</label>
      <div class='control'>
          <input class='input' type='text' v-model='work.JobEndDate' placeholder='Sept 2018'>
      </div>
      </div>

      <div class='field'>
        <label class='label'>Job Duties</label>
        <div class='control'>
            <input class='textarea'
              v-for='(duty, index) in work.JobDuties' :key='duty'
              v-model='work.JobDuties[index].duty'
              placeholder='Job Duties'>
            
        </div>
        <div class='control'>
            <a class='button is-warning' @click='addJobDutyField'> Add job duty </a>
            <a class='button is-warning' @click='removeJobDutyField'> Remove job duty </a>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    addJobDutyField() {
      this.work.JobDuties.push({});
    },
    removeJobDutyField() {
      this.work.JobDuties.pop();
    }
  }
};
</script>

<style>

</style>
