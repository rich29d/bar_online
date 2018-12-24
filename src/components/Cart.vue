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
                .Cart__Item(v-for = 'drink of cart' class = 'FadeInDown')
                  .Cart__Item--product
                    .Cart__Item--img
                      img(:src = 'drink.img')
                    .Cart__Item--name {{drink.name}}
                  .Cart__Item--amount
                    i.fas.fa-plus(@click = 'plusAmount(drink.index)')
                    .Amount--number {{drink.amount}}
                    i.fas.fa-minus(@click = 'minusAmount(drink.index)')
                  .Cart__Item--price {{price(drink.amount * drink.price)}}
                  i.far.fa-times-circle.DeleteDrink(@click = 'deleteDrink(drink.index)')
              .Cart__List--footer
                p Total
                  span {{price(total)}}
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { formatPrice } from '../functions';

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

    total() {
      return this.cart.reduce((result, drink) => result + (drink.amount * drink.price), 0);
    },
  },
  methods: {
    ...mapMutations(['REMOVE_DRINK']),

    ...mapActions([
      'removeDrink',
      'amount',
    ]),

    price(value) {
      return formatPrice(value);
    },

    plusAmount(index) {
      this.amount({ index, action: 'PLUS' });
    },

    minusAmount(index) {
      this.amount({ index, action: 'MINUS' });
    },

    deleteDrink(index) {
      this.amount({ index, action: 'ZERO' });
      this.removeDrink({ index, area: 'cart' });
    },
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
  top 65px

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
    width 450px
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
        padding 15px 25px

      &--main
        padding 5px 25px
        overflow auto
        max-height 400px
        background center center / 30% no-repeat

        &:empty
          background-image url('../assets/img/beer_hand.svg')
          padding-top 200px
          padding-bottom 15px
          text-align center

          &:after
            font-size 13px
            color var(--secundary)
            content 'Nenhum item ainda'

        &::-webkit-scrollbar-track
          background color-lista

        &::-webkit-scrollbar-thumb
            border 7px solid color-lista

        &::-webkit-scrollbar-thumb:hover
            border-width 5px

      &--footer
        padding 25px

        span
          float right

  .Cart__Item
    display flex
    align-items center
    justify-content space-between
    height 45px
    border-radius 3px
    margin-top 15px

    &--product
      display flex
      align-items center
      width 50%

    &--img
      padding 5px
      padding-left 0
      margin-left -10px

      img
        height 35px

    &--amount
      display flex
      align-items center

      i
        color var(--secundary)
        font-size 9px
        cursor pointer

      .Amount--number
        width 25px
        text-align center

    &--price
      width 25%
      text-align right

.DeleteDrink
  color var(--danger)
  cursor pointer

@keyframes fadeInDown
  from
    opacity 0
    transform translateY(-30px)

  to
    opacity 1
    transform translateY(0)

.FadeInDown
  animation fadeInDown .3s ease

</style>
