<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="stylus">
  :root
    --primary #292b30
    --secundary #00dc80

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
</style>
