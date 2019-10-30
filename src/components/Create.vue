<template>
    <div class="main-body">
        <div class="file-edit">
            <h2 class="file-edit__name">
                <input type="text" placeholder="filename.ext">
            </h2>
            <textarea></textarea>
            <div class="file-edit__buttons">
                <button class="btn btn--positive">Save</button>
                <router-link to="/" class="btn btn--back">Back</router-link>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Create"
  }
</script>

<style scoped>

</style>
