<template>
    <div class="main-body">
        <form class="file-edit">
            <h2 class="file-edit__name">
                <input type="text" placeholder="filename.ext" v-model="file.name">
            </h2>
            <textarea v-model="file.content"></textarea>
            <div class="file-edit__buttons">
                <button class="btn btn--positive"
                        @click.prevent="handleSubmit">
                    Save
                </button>
                <router-link to="/" class="btn btn--back">Back</router-link>
            </div>
        </form>
    </div>
</template>

<script>
  import * as types from '../store/types';

  export default {
    name: "Create",
    data() {
      return {
        file: {
          name: 'test.txt',
          content: 'test content'
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$store.dispatch(types.CREATE_FILE, this.file)
          .then(() => {
            this.$router.push({name: 'list'});
          })
          .catch(() => console.log('catch'))
          .finally(() => console.log('finally'));
      }
    }
  }
</script>

<style scoped>

</style>
