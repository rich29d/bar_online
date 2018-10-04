<template lang='pug'>
    .Compare
      .Compare__Box
        .Compare__Content
          .Compare__CountDrinks
            span {{countDrinks}}
            |/3
          .Compare__Items
            .Drink(v-for = 'drink of compare')
              img(:src = 'drink.img')
          button.Btn.Compare__Btn Compare
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Compare',
  computed: {
    ...mapGetters([
      'countDrinks',
    ]),
    ...mapState([
      'compare',
    ]),
  },
  methods: {
    ...mapMutations(['REMOVE_DRINK']),
    ...mapActions(['removeDrink']),
  },
};
</script>

<style lang='stylus'>
.Compare
  height 65px
  width 100%

  .Compare__Box
    background #202227
    padding 10px
    text-align right
    position fixed
    width 100%
    z-index 2

    .Compare__Content
      max-width 1300px
      width calc(100% - 40px)
      padding 0 20px
      margin auto
      display flex
      justify-content space-between
      align-items center

    .Compare__CountDrinks
      color #383740
      font-size 20px
      margin-top -7px

      span
        font-size 30px
        color var(--secundary)

    .Compare__Items
      width 100%

      .Drink
        border-radius 3px
        height 45px
        background #383740
        padding 5px
        display inline-block
        margin-right 10px

      img
        height 100%

  .Compare__Btn
    height 45px
    color #565B6C
</style>
