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
            <hr>
            <Create/>
            <hr>
            <Edit/>

        </div>
    </div>
</template>

<script>
  import List from "./components/List";
  import Create from "./components/Create";
    import Edit from "./components/Edit";

  export default {
    name: 'app',
    components: {
      List,
      Create,
      Edit
    }
  }
</script>

<style lang="scss">
    @import "./assets/scss/main";
</style>
