<template>
    <div class="main-body">
        <div class="file-edit">
            <h2 class="file-edit__name">{{this.$route.params.filename}}</h2>
            <textarea v-model="content"></textarea>
            <div class="file-edit__buttons">
                <button type="submit"
                        class="btn btn--positive"
                        @click.prevent="setValue"> Save
                </button>
                <button class="btn btn--back"
                        @click="goBack">Back
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import * as types from '../store/types';
  import {mapGetters} from 'vuex';

  export default {
    name: "Edit",
    data() {
      return {
        content: ''
      }
    },
    created() {
      this.getContent();
    },
    computed: {
      ...mapGetters(['getFileByFilename'])
    },
    methods: {
      async getContent() {
        let file = this.getFileByFilename(this.$route.params.filename);
        if (typeof file.content === 'undefined') {
          try {
            await this.$store.dispatch(types.FETCH_SELECTED_CONTENT, file)
          } catch (e) {
            console.log(e)
          }
        }

        this.content = file.content;
      },
      setValue() {
        if (this.content !== this.getFileByFilename(this.$route.params.filename).content) {
          this.$store.dispatch(types.CREATE_FILE, {
            name: this.$route.params.filename,
            content: this.content
          }).then(() => {
            this.goBack();
          })
        } else {
          this.goBack();
        }
      },
      goBack() {
        return this.$router.push({name: 'selected', params: {filename: this.$route.params.filename}});
      }
    }
  }
</script>

<style scoped>

</style>
