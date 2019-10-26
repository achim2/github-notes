<template>
    <div id="app">
        <div class="github-notes">
            <header class="main-header">
                <h1 class="main-header__title">Github notes</h1>
                <figure class="user-info">
                    <picture class="user-info__avatar"><img src="https://avatars1.githubusercontent.com/u/499550?v=4" alt="Profile picture"></picture>
                    <figcaption class="user-info__name">Evan You</figcaption>
                </figure>
            </header>

            <!-- main body -->
          <List/>
        </div>
    </div>
</template>

<script>
  import List from "./components/List";

  export default {
    name: 'app',
    components: {
      List
    }
  }
</script>

<style lang="scss">
    @import "./assets/scss/main";
</style>
