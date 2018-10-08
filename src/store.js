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
    ADD_DRINK: (state, objectItem) => {
      const { drink, area } = objectItem;
      state[area].push(drink);
    },
    REMOVE_DRINK: (state, objectItem) => {
      const { index, area } = objectItem;
      const indexCompare = state[area].findIndex(drink => drink.index === index);

      return state[area].splice(indexCompare, 1);
    },
  },
  actions: {
    addDrink: (context, objectItem) => context.commit('ADD_DRINK', objectItem),
    removeDrink: (context, objectItem) => context.commit('REMOVE_DRINK', objectItem),
  },
});
