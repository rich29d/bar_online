import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    compare: [],
  },
  getters: {
    countDrinks: state => state.compare.length,
  },
  mutations: {
    ADD_DRINK: (state, drink) => state.compare.push(drink),
    REMOVE_DRINK: (state, index) => {
      const indexCompare = state.compare.findIndex(drink => drink.index === index);

      return state.compare.splice(indexCompare, 1);
    },
  },
  actions: {
    removeDrink: (context, drink) => context.commit('REMOVE_DRINK', drink),
  },
});
