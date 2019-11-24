<template>
    <div class="main-body">
        <aside class="main-sidebar">
            <ul class="file-list">
                <router-link :to="{name: 'selected', params: {filename: file.filename}}"
                             tag="li"
                             v-for="(file) in getData.files"
                             :key="file.id"
                             :class="{'active': getActive === file.filename}"
                >{{file.filename}}
                </router-link>
            </ul>
            <router-link :to="{name: 'create'}" tag="button" class="main-sidebar__add">Add new</router-link>
        </aside>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: "List",
    computed: {
      getData() {
        return this.$store.state.data;
      },
      getActive() {
        return this.$route.params.filename;
      }
    }
  }
</script>

<style scoped>

</style>
