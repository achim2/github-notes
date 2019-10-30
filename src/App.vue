<template>
    <div id="app">
        <div class="github-notes">
            <header class="main-header">
                <router-link to="/" tag="h1" class="main-header__title">Github notes</router-link>
                <figure class="user-info">
                    <picture class="user-info__avatar"><img src="https://avatars1.githubusercontent.com/u/499550?v=4" alt="Profile picture"></picture>
                    <figcaption class="user-info__name">Evan You</figcaption>
                </figure>
            </header>

            <!-- main body -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">
    @import "./assets/scss/main";
</style>
