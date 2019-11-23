<template>
    <div id="app" v-if="Object.entries(getSpecificGist).length !== 0 && getSpecificGist.constructor === Object">
        <div class="github-notes">
            <header class="main-header">
                <router-link to="/" tag="h1" class="main-header__title">Github notes</router-link>
                <figure class="user-info">
                    <picture class="user-info__avatar"><img :src="getSpecificGist.owner.avatar_url" alt="Profile picture"></picture>
                    <figcaption class="user-info__name">{{getSpecificGist.owner.login}}</figcaption>
                </figure>
            </header>
            <!-- main body -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import * as types from './store/types';

  export default {
    name: 'app',
    data() {
      return {}
    },
    async beforeMount() {
      try {
        await this.$store.dispatch(types.FETCH_DATA);
      }catch (e) {
        console.log(e)
      }
    },
    computed: {
      getSpecificGist() {
        return this.$store.state.data;
      }
    },
  }
</script>

<style lang="scss">
    @import "./assets/scss/main";
</style>
