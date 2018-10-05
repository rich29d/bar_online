<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
  name: 'App',
};
</script>

<style lang="stylus">
  :root
    --primary #292b30
    --secundary #00dc80
    --dark #202227
    --danger #ff5151

  @font-face
    font-family 'roboto'
    src url(assets/fonts/Roboto-Regular.ttf)

  @font-face
    font-family 'roboto'
    src url(assets/fonts/Roboto-Bold.ttf)
    font-weight bold

  *
    box-sizing border-box
    font-family 'roboto'
    letter-spacing 1px
    transition all .3s ease

  body
    margin: 0
    padding: 0
    background-color: var(--primary)

  ::-webkit-scrollbar
      width 15px

  ::-webkit-scrollbar-track
      background #25272c

  ::-webkit-scrollbar-thumb
      background #555
      border-radius 50px
      border 7px solid #25272c

  ::-webkit-scrollbar-thumb:hover
      background #888
      border-width 5px
</style>
