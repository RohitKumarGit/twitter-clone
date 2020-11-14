import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/scss/style.scss'
Vue.use(Buefy)
import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyCvILHG7Co-4XI3ZYX8RTbevSZ8xRTGC4E",
  authDomain: "twitter-clone-40897.firebaseapp.com",
  databaseURL: "https://twitter-clone-40897.firebaseio.com",
  projectId: "twitter-clone-40897",
  storageBucket: "twitter-clone-40897.appspot.com",
  messagingSenderId: "821803565237",
  appId: "1:821803565237:web:32b4794f42c2f164413efc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
