<template>
    <main class="main-content">
        <div v-if="!selected" class="main-content__empty">Nothing selected</div>
        <div v-else class="file-item">
            <div class="file-item__body">
                <div class="file-item__header">
                    <h2 class="file-item__name">{{selected.filename}}</h2>
                    <div class="file-item__buttons">
                        <button class="btn btn--negative"
                                @click="handleDelete(selected)">Delete
                        </button>
                        <router-link :to="{name: 'edit', params: {filename: selected.filename}}" class="btn btn--positive">Edit</router-link>
                    </div>
                </div>
                <div class="file-item__content"
                     v-if="selected.content">
                    <pre>{{selected.content}}</pre>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
  import * as types from '../store/types';
  import {mapGetters} from 'vuex';

  export default {
    name: "List-selected",
    data() {
      return {
        selected: null,
      }
    },
    created() {
      this.handleSelectedFile(this.$route)
    },
    watch: {
      '$route': 'handleSelectedFile'
    },
    computed: {
      ...mapGetters(['getFileByFilename'])
    },
    methods: {
      async handleSelectedFile(route) {
        let file = this.getFileByFilename(route.params.filename);

        if (this.selected !== file) {
          try {
            await this.$store.dispatch(types.FETCH_SELECTED_CONTENT, file)
          } catch (e) {
            console.log(e)
          } finally {
            this.selected = file;
          }
        }
      },
      async handleDelete(file) {
        const isOk = window.confirm('Are you sure you want to delete this file?');
        if (isOk) {
          try {
            await this.$store.dispatch(types.REMOVE_FILE, file);
          } catch (e) {
            console.log(e)
          } finally {
            await this.$router.push({name: 'list'});
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
