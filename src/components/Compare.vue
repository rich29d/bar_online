<template lang='pug'>
    .Compare
      .Compare__Box(:class = '{"Show--all": showAll && compare.length > 0}')
        .Compare__Header
          .Compare__CountDrinks
            span {{countDrinksCompare}}
            |/3
          .Compare__Items
            .Drink(
              v-for = 'drink of compare'
              @click = 'remove(drink.index)'
              v-tooltip.bottom = 'drink.name'
            )
              i.far.fa-times-circle
              img(:src = 'drink.img')
          button.Btn.Compare__Btn(@click = 'showAll = !showAll; compareDrinks()')
            span(v-if = '!showAll') Comparar
            span(v-if = 'showAll') Fechar
        .Compare__List
          .Drink--item(v-for = '(drink, index) in compare')
            .Drink--img
              img(:src = 'drink.img')
            .Drink--name {{drink.name}}
            .Drink--price(:class = '{Better : index === indexBetter.price}')
              small Preço
              |{{price(drink.price)}}
            .Drink--alcohol(:class = '{Better : index === indexBetter.alcohol}')
              small Alcool
              |{{drink.alcohol}}%
            .Drink--buyAmount(:class = '{Better : index === indexBetter.buyAmount}')
              small Pedidos
              |{{drink.buy_amount}}

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { formatPrice } from '../functions';

export default {
  name: 'Compare',

  data() {
    return {
      indexBetter: {
        price: -1,
        alcohol: -1,
        buyAmount: -1,
      },
      showAll: false,
    };
  },

  computed: {
    ...mapGetters([
      'countDrinksCompare',
    ]),

    ...mapState([
      'compare',
    ]),
  },

  methods: {
    ...mapMutations(['REMOVE_DRINK']),

    ...mapActions(['removeDrink']),

    remove(index) {
      this.removeDrink({ index, area: 'compare' });
      this.compareDrinks();
      this.showAll = this.showAll && this.compare.length > 0;
    },

    price(value) {
      return formatPrice(value);
    },

    getBetter(type, item) {
      const indexes = this.compare.map(drink => Number(drink[item]));
      const better = Math[type](...indexes);
      return this.compare.findIndex(drink => Number(drink[item]) === better);
    },

    compareDrinks() {
      this.indexBetter.price = this.getBetter('min', 'price');
      this.indexBetter.alcohol = this.getBetter('max', 'alcohol');
      this.indexBetter.buyAmount = this.getBetter('max', 'buy_amount');
    },
  },
};
</script>

<style lang='stylus'>
.Compare
  width 100%

  .Compare__Box
    background #202227
    padding 10px
    text-align right
    position fixed
    height 65px
    overflow hidden
    width 100%
    z-index 4

    &.Show--all
      height 100%

      .Compare__Btn
        background-color var(--secundary)

      .Compare__List
        opacity 1
        margin-top 0

    .Compare__Header
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
        position relative
        align-items center
        justify-content center
        cursor pointer

        i
          position absolute
          font-size 25px
          left: 50%;
          top: 50%;
          color var(--danger)
          opacity 0
          transform translate(-50%, -50%)

        img
          height 100%

        &:hover
          i
            opacity 1

          img
            opacity 0
            transform scale(.8)
    .Compare__List
      display flex
      justify-content center
      opacity 0
      margin-top 40px

      .Drink
        &--item
          color #cecece
          text-align center
          width 20%

          div
            padding 10px 0
            margin 10px
            font-size: 23px;

          .Better
            border-radius 3px;
            box-shadow 0 0 0 1px var(--secundary)

          small
            display block
            font-size: 10px;
            color: var(--secundary);

        &--name
          font-weight: bold;

    .Compare__Btn
      min-width 110px
      height 45px
      color #565B6C
</style>
