<template lang='pug'>
    header
        .Header__Box
            .Header__Content
                .Cart
                    .Cart__Icon
                        .Cart__Counter(:class = '{show: cart.length > 0}') {{countDrinksCart}}
                        i.fas.fa-shopping-cart
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Cart',
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

    .Cart__Icon
        display flex
        align-items center
        justify-content center
        width 45px
        height 45px
        background-color #202227
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
</style>
