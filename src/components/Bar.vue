<template lang="pug">
  div
    .header
      .Box--compare
        button.Btn.Btn--compare Compare
    main
      .Box
        .Drink--list
          .Drink--item(v-for = 'drink of drinks')
            .Drink--img
              img(:src = '`https://tympanus.net/Blueprints/ProductComparison/images/${drink.img}`')
            .Drink--name {{drink.name}}
            .Drink--footer
              .Drink--price {{drink.price}}
              .drink--button
                button.Btn.Btn--add Adicionar
</template>

<script>
export default {
  name: 'Bar',
  data() {
    return {
      drinks: [
        {
          img: '1.png',
          name: 'Gin Gordons 750 ml',
          price: 'R$ 55,45',
        },
        {
          img: '2.png',
          name: 'Whisky Jack Daniel\'s Master Distiller nº2 750 ml',
          price: 'R$ 59,75',
        },
        {
          img: '4.png',
          name: 'Whisky Jack Daniels Single Barrel 750 ml',
          price: 'R$ 65,78',
        },
        {
          img: '5.png',
          name: 'Catupinga Vinho Licoroso 900 ml',
          price: 'R$ 15,79',
        },
        {
          img: '1.png',
          name: 'Gin Gordons 750 ml',
          price: 'R$ 55,45',
        },
        {
          img: '2.png',
          name: 'Whisky Jack Daniel\'s Master Distiller nº2 750 ml',
          price: 'R$ 59,75',
        },
        {
          img: '4.png',
          name: 'Whisky Jack Daniels Single Barrel 750 ml',
          price: 'R$ 65,78',
        },
        {
          img: '5.png',
          name: 'Catupinga Vinho Licoroso 900 ml',
          price: 'R$ 15,79',
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
  .Box
    padding 50px

    @media screen and (max-width: 650px)
      padding 0

  .header
    height 65px
    width 100%

    .Box--compare
      background #202227
      padding 10px
      text-align right
      position fixed
      width 100%
      z-index 2

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

  .Btn--compare
    height 45px
    color #565B6C

  .Btn--add
    height 45px
    width 100%

  .Drink--list
    display flex
    flex-wrap wrap
    justify-content space-between

    .Drink--item
      background #24252A
      color #cecece
      border-radius 5px
      width calc(25% - 30px)
      text-align center
      padding 30px
      padding-bottom 150px
      position relative
      margin-bottom 40px

      @media screen and (max-width: 1200px)
        width calc(33% - 30px)

      @media screen and (max-width: 950px)
        width calc(50% - 30px)

      @media screen and (max-width: 650px)
        width 100%
        margin-bottom: 2px;

      .Drink--name
        margin-top 20px
        font-weight bold
        font-size 23px

      .Drink--footer
        position absolute
        bottom 30px
        left 30px
        width calc(100% - 60px)

        .Drink--price
          color var(--secundary)

        .drink--button
          margin-top 20px
</style>
