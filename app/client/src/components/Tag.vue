<template>
    <div class='tags'>
        <div>
            <span v-for='(tag, index) in TagList' :key= 'tag' class='tag is-medium is-rounded is-primary' >
                {{tag}}
                <a @click='RemoveTag(index)' class='delete'></a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['TagList'],
  methods: {
    RemoveTag(index) {
      this.$delete(this.TagList, index);
    }
  }
};
</script>

<style>

</style>
