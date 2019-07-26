import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    numCorrect: 0, // The TV inventory
    numIncorrect: 0 // The TV inventory
  },
  
  getters: {
    // Here we will create a getter
  },
  
  mutations: {
    increment (state,payload) {
        state.numCorrect = payload.correct;
        state.numIncorrect = payload.incorrect;
      }
  },
  
  actions: {
    // Here we will create Larry
  },
});