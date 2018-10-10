<template lang="pug">
  div
    Compare(:class = '{show: compare.length > 0}')
    Cart
    main
      Loading(v-if = 'drinks.length === 0')
      .Box
        .Drink__List
          .Drink--item(
            v-for = '(drink, index) in drinks'
            :class = '{selected: isChecked(index)}'
          )
            .Tooltip
              span comparar
              input.Drink__checkbox(
                type = 'checkbox'
                @click = 'toggle(index, isChecked(index), "compare")'
                :checked = 'isChecked(index)'
                :id = '`item--${index}`'
                :value = 'index'
                :disabled = 'compare.length >= 3 && !isChecked(index)'
              )
              label(:for = '`item--${index}`')
                i.fas(:class = 'classIcon(index)')
            .Drink--img
              img(:src = 'drink.img')
            .Drink--name {{drink.name}}
            .Drink--footer
              .Drink--price {{formatPrice(drink.price)}}
              .drink--button
                button.Btn.Btn--add(
                  @click = 'toggle(index, inCart(index), "cart")'
                  :class = '{active: inCart(index)}'
                )
                  span(v-if = '!inCart(index)') Adicionar
                  span(v-if = 'inCart(index)') Remover
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Loading from './Loading';
import Compare from './Compare';
import Cart from './Cart';

export default {
  name: 'Bar',
  components: {
    Loading,
    Compare,
    Cart,
  },

  data() {
    return {
      drinks: [],
      loaded: 0,
      response: [],
    };
  },

  async created() {
    const resp = await this.$http.get('https://my.api.mockaroo.com/drinks.json?key=164c6660');
    // this.response = resp.data;
    // this.loadAllImages();
    this.drinks = resp.data;
  },

  computed: {
    ...mapState([
      'compare',
      'cart',
    ]),
  },

  methods: {
    ...mapMutations([
      'ADD_DRINK',
      'REMOVE_DRINK',
      'PLUS_AMOUNT',
    ]),

    ...mapActions([
      'removeDrink',
      'addDrink',
      'amount',
    ]),

    toggle(index, toggle, area) {
      const drink = this.drinks[index];
      drink.index = index;

      if (toggle) {
        // eslint-disable-next-line
        area === 'cart' && this.amount({ index, action: 'ZERO' });
        this.removeDrink({ index, area });
      } else {
        this.addDrink({ drink, area });
        // eslint-disable-next-line
        area === 'cart' && this.amount({ index, action: 'PLUS' });
      }
    },

    isChecked(index) {
      return this.compare.findIndex(drink => drink.index === index) > -1;
    },

    inCart(index) {
      return this.cart.findIndex(drink => drink.index === index) > -1;
    },

    classIcon(index) {
      return this.isChecked(index) ? 'fa-check-circle' : 'fa-plus-circle';
    },

    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',');
      const formated = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `R$ ${formated}`;
    },

    loadAllImages() {
      // eslint-disable-next-line
      for (const image of this.response) {
        this.loadImage(image);
      }
    },

    loadImage(image) {
      const newImage = new Image();

      newImage.onload = () => {
        this.loaded += 1;

        if (this.loaded === this.response.length) {
          this.drinks = this.response;
        }
      };

      newImage.src = image.img;
    },
  },
};
</script>

<style lang="stylus">
  .Compare
    margin-top -65px

    &.show
      margin-top 0

  .Box
    padding 50px 30px

    @media screen and (max-width: 650px)
      padding 0

  .Btn
    border none
    background-color #383740
    padding 0 20px
    border-radius 3px
    color #FFF
    outline none
    font-weight 600
    cursor pointer
    min-height 30px

  &.active,
  .Btn:hover
    color var(--primary)
    background-color var(--secundary)

  .Btn--add
    height 45px
    width 100%

    @media screen and (max-width: 650px)
      width 50%

  .Drink__List
    display flex
    flex-wrap wrap
    max-width 1300px
    margin auto;

    .Drink--item
      background #24252A
      color #cecece
      border-radius 5px
      width calc(25% - 40px)
      text-align center
      padding 30px 0 150px 0
      position relative
      margin 0 20px
      margin-bottom 40px

      @media screen and (max-width: 1200px)
        width calc(33% - 40px)

      @media screen and (max-width: 950px)
        width calc(50% - 40px)

      @media screen and (max-width: 650px)
        width 100%
        padding 60px 0 180px 0
        margin 0
        margin-bottom 2px

      &.selected
        box-shadow 0 0 0 2px var(--secundary)

      .Tooltip
        position absolute
        top 30px
        right 30px
        display flex
        align-items center

        span
          margin-top: -2px
          position absolute
          right 20px
          font-size: 14px
          opacity 0
          pointer-events none
          color var(--secundary)

        &:hover
          span
            margin-right: 0
            right 25px
            opacity 1

      .Drink__checkbox
        width 0
        height 0
        opacity 0

        & + label
          color var(--secundary)
          cursor pointer

        &:disabled + label
          i
            color #383740

      .Drink--name
        margin-top 20px
        font-weight bold
        font-size 23px

      .Drink--footer
        position absolute
        bottom 30px
        left 30px
        width calc(100% - 60px)

        @media screen and (max-width: 650px)
          bottom 60px

        .Drink--price
          color var(--secundary)

        .drink--button
          margin-top 20px
</style>
