<template>
    <div class="main-body">
        <aside class="main-sidebar">
            <ul class="file-list" v-for="(file, key) in getSpecificGist.files" :key="key">
                <li @click="handleSelectedFile(file)"
                    :class="{'active': selected === file}">{{file.filename}}
                </li>
                <!--                <li>welcome.txt</li>-->
                <!--                <li>Lorem.txt</li>-->
                <!--                <li class="is-active">Ipsum.txt</li>-->
                <!--                <li>2_hu_18bef50f3e4061f6ec800e02f1709f80__9IQ25DOQMBNGRB74_.log</li>-->
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
                            <button class="btn btn--negative">Delete</button>
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
  import * as actionTypes from '../store/types/actionTypes';

  export default {
    name: "List",
    data() {
      return {
        selected: null,
        isActive: null
      }
    },
    computed: {
      getSpecificGist() {
        return this.$store.getters.getSpecificGist;
      },
      getSelectedContent() {
        return this.$store.state.selectedContent;
      }
    },
    methods: {
      handleSelectedFile(file) {
        if (this.selected !== file) {
          this.selected = file;
          this.$store.dispatch(actionTypes.FETCH_SELECTED_CONTENT, file.raw_url)
        }
      }
    }
  }
</script>

<style scoped>

</style>
