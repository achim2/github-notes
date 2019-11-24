<template>
    <div id="app" v-if="Object.entries(getData).length !== 0 && getData.constructor === Object">
        <div class="github-notes">
            <header class="main-header">
                <router-link to="/" tag="h1" class="main-header__title">Github notes</router-link>
                <figure class="user-info">
                    <picture class="user-info__avatar"><img :src="getData.owner.avatar_url" alt="Profile picture"></picture>
                    <figcaption class="user-info__name">{{getData.owner.login}}</figcaption>
                </figure>
            </header>
            <!-- main body -->
            <router-view></router-view>
        </div>
        <div :class="['loading-layout', {'active': loading}]">
            <img :src="require('./assets/loader.gif')" alt="Loading..."/>
        </div>
    </div>
</template>

<script>
  import * as types from './store/types';

  export default {
    name: 'app',
    async beforeMount() {
      try {
        await this.$store.dispatch(types.FETCH_DATA);
      } catch (e) {
        console.log(e)
      }
    },
    computed: {
      getData() {
        return this.$store.state.data;
      },
      loading() {
        return this.$store.state.isLoading;
      }
    },
  }
</script>

<style lang="scss">
    @import "./assets/scss/main";
</style>
