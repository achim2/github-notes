<template>
    <div class="main-body">
        <aside class="main-sidebar">
            <ul class="file-list">
                <li v-for="(file) in getSpecificGist.files"
                    :key="file.id"
                    @click="handleSelectedFile(file)"
                    :class="{'active': selected === file}">{{file.filename}}
                </li>
            </ul>
            <router-link :to="{name: 'create'}" tag="button" class="main-sidebar__add">Add new</router-link>
        </aside>
        <main class="main-content">
            <div v-if="!selected" class="main-content__empty">Nothing selected</div>
            <div v-if="selected" class="file-item">
                <div class="file-item__body">
                    <div class="file-item__header">
                        <h2 class="file-item__name">{{selected.filename}}</h2>
                        <div class="file-item__buttons">
                            <button class="btn btn--negative"
                                    @click="handleDelete(selected)">Delete
                            </button>
                            <router-link :to="{name: 'edit', params: {id: 1}}" class="btn btn--positive">Edit</router-link>
                        </div>
                    </div>
                    <div class="file-item__content">
                        <pre>{{getSelectedContent}}</pre>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
  import * as types from '../store/types';

  export default {
    name: "List",
    data() {
      return {
        selected: null,
        isActive: null
      }
    },
    watch: {
      // selected() {
      //   console.log('selected watcher');
      //   let keys = Object.keys(this.getSpecificGist.files);
      //   this.selected = this.getSpecificGist.files[keys[0]]
      // },
    },
    computed: {
      getSpecificGist() {
        return this.$store.state.data;
      },
      getSelectedContent() {
        return this.$store.state.selectedContent;
      }
    },
    methods: {
      async handleSelectedFile(file) {
        if (this.selected !== file) {
          try {
            this.selected = file;
            await this.$store.dispatch(types.FETCH_SELECTED_CONTENT, file.raw_url)
          } catch (e) {
            console.log(e)
          }
        }
      },
      async handleDelete(file) {
        let keys = Object.keys(this.getSpecificGist.files);
        const isOk = window.confirm('Are you sure you want to delete this file?');
        if (isOk) {
          try {
            await this.$store.dispatch(types.REMOVE_FILE, file);
            //Todo: the github needs few seconds to remove the file, so the page reload loads the file again that is already removed
            this.handleSelectedFile(this.getSpecificGist.files[keys[1]]);
          } catch (e) {
            console.log(e)
          } finally {
            console.log('finally')
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
