<template>
    <div class="main-body">
        <div class="file-edit">
            <h2 class="file-edit__name">filename.txt</h2>
            <textarea></textarea>
            <div class="file-edit__buttons">
                <button class="btn btn--positive">Save</button>
                <button @click="goBack" class="btn btn--back">Back</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Edit",
    methods: {
      goBack () {
        return this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
