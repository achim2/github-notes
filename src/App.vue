<template>
    <div id="app" v-if="getSpecificGist">
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
    import * as actionTypes from './store/types/actionTypes';

  export default {
    name: 'app',
    data() {
      return {
      }
    },
    beforeMount() {
      this.$store.dispatch(actionTypes.FETCH_DATA);
    },
    computed: {
      getSpecificGist() {
        return this.$store.getters.getSpecificGist;
      }
    },
  }
</script>

<style lang="scss">
    @import "./assets/scss/main";
</style>
