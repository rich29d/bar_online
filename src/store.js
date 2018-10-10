import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    compare: [],
    cart: [],
  },
  getters: {
    countDrinksCompare: state => state.compare.length,
    countDrinksCart: state => state.cart.length,
  },
  mutations: {
    AMOUNT: (state, objectItem) => {
      const { index, action } = objectItem;
      const indexItem = state.cart.findIndex(drink => drink.index === index);

      switch (action) {
        case 'PLUS': state.cart[indexItem].amount += 1; break;
        case 'MINUS':
          if (state.cart[indexItem].amount > 1) {
            state.cart[indexItem].amount -= 1;
          }
          break;
        default: state.cart[indexItem].amount = 0; break;
      }
    },
    ADD_DRINK: (state, objectItem) => {
      const { drink, area } = objectItem;
      state[area].push(drink);
    },
    REMOVE_DRINK: (state, objectItem) => {
      const { index, area } = objectItem;
      const indexItem = state[area].findIndex(drink => drink.index === index);

      return state[area].splice(indexItem, 1);
    },
  },
  actions: {
    amount: (context, objectItem) => context.commit('AMOUNT', objectItem),
    addDrink: (context, objectItem) => context.commit('ADD_DRINK', objectItem),
    removeDrink: (context, objectItem) => context.commit('REMOVE_DRINK', objectItem),
  },
});
