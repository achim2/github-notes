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
                <a @click="goBack" class="btn btn--back">Back</a>
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
          .catch(() => console.log('catch'));
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
