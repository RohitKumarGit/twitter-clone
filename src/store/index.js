import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from 'firebase'
//import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  mutations: {
    addUser(state,data){
      
      state.user = data.user
    }
  }
 
})
