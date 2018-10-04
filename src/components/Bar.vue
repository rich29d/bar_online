<template lang="pug">
  div
    Compare(:class = '{show: checkeds.length > 0}')
    main
      Loading(v-if = 'drinks.length === 0')
      .Box
        .Drink--list
          .Drink--item(
            v-for = '(drink, index) in drinks'
            :class = '{selected: checkeds.indexOf(index) > -1}'
          )
            input.Drink__checkbox(
              type = 'checkbox'
              @click = 'toggleCompare(index, checkeds.indexOf(index) === -1)'
              v-model = 'checkeds'
              :value = 'index'
              :disabled = 'checkeds.length >= 3 && checkeds.indexOf(index) === -1'
            )
            .Drink--img
              img(:src = 'drink.img')
            .Drink--name {{drink.name}}
            .Drink--footer
              .Drink--price {{formatPrice(drink.price)}}
              .drink--button
                button.Btn.Btn--add Adicionar
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Loading from './Loading';
import Compare from './Compare';

export default {
  name: 'Bar',
  components: {
    Loading,
    Compare,
  },

  data() {
    return {
      checkeds: [],
      drinks: [],
      loaded: 0,
      response: [],
    };
  },

  async created() {
    const resp = await this.$http.get('https://my.api.mockaroo.com/drinks.json?key=164c6660');
    this.response = resp.data;
    this.loadAllImages();
  },

  computed: {
    ...mapState([
      'compare',
    ]),
  },

  methods: {
    ...mapMutations([
      'ADD_DRINK',
      'REMOVE_DRINK',
    ]),

    toggleCompare(index, toggle) {
      const drink = this.drinks[index];
      drink.index = index;
      // eslint-disable-next-line
      toggle ? this.ADD_DRINK(drink) : this.REMOVE_DRINK(index);
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

  .Btn:hover
    background-color var(--secundary)

  .Btn--add
    height 45px
    width 100%

    @media screen and (max-width: 650px)
      width 50%

  .Drink--list
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

      .Drink__checkbox
        position absolute
        top 30px
        right 30px

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
