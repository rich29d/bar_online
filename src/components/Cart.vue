<template lang='pug'>
  header
    .Header__Box
      .Header__Content
        .Cart
            .Cart__Icon(@click = 'cartShow = !cartShow')
              .Cart__Counter(:class = '{show: cart.length > 0}') {{countDrinksCart}}
              i.fas.fa-shopping-cart
            .Cart__List(:class = '{show: cartShow}')
              .Cart__List--header
                p Carrinho de compras
              .Cart__List--main
                .Cart__Item(v-for = 'drink of cart')
                  .Cart__Item--img
                    img(:src = 'drink.img')
                  .Cart__Item--name {{drink.name}}
                  .Cart__Item--amount
              .Cart__List--footer
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      cartShow: false,
    };
  },
  computed: {
    ...mapGetters([
      'countDrinksCart',
    ]),
    ...mapState([
      'cart',
    ]),
  },
  methods: {
    ...mapMutations(['REMOVE_DRINK']),
    ...mapActions(['removeDrink']),
  },
};
</script>

<style lang='stylus'>
color-lista = #202227;

header
    width 100%
    height 65px

    .Header__Box
        position fixed
        z-index 2
        width 100%

        .Header__Content
            max-width 1300px
            width calc(100% - 40px)
            padding 20px 25px 0
            margin auto
            display flex
            align-items center

.Cart
  margin-left auto
  position relative

  .Cart__Icon
    display flex
    align-items center
    justify-content center
    width 45px
    height 45px
    background-color color-lista
    border-radius 50%
    cursor pointer
    position relative

    .Cart__Counter
      top -8px
      right -8px
      font-size 10px
      padding 4px 0 4px 2px
      border 3px solid #292b30
      min-width 25px
      height 25px
      text-align center
      position absolute
      border-radius 50px
      background-color var(--secundary)
      transform scale(0)

      &.show
          transform scale(1)

    i
        color #cecece

  .Cart__List
    position absolute
    right 0
    background color-lista
    width 300px
    color #becece
    border-radius 5px
    margin-top 0
    opacity 0
    height 0
    overflow hidden

    &.show
      height auto
      margin-top 15px
      opacity 1

    p
        margin 0

    .Cart__List
      &--header
        padding 15px 25px 0
      
      &--main
        padding 0 25px
        overflow auto
        max-height 400px
        background center center / 50% no-repeat

        &:empty
          background-image url('../assets/img/beer_hand.svg')
          padding-top 225px
          padding-bottom 15px
          text-align center
          font-size 13px
          color var(--secundary)
     
          &:after
            content 'Nenhum item ainda'

        &::-webkit-scrollbar-track
          background color-lista

        &::-webkit-scrollbar-thumb
            border 7px solid color-lista

        &::-webkit-scrollbar-thumb:hover
            border-width 5px

      &--footer
        padding 0 25px 25px

  .Cart__Item
    display flex
    align-items center
    height 45px
    background #383740
    border-radius 3px
    margin-top 15px

    .Cart__Item--img
      padding 5px

      img
        height 35px
</style>
