import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import store from './store';

import bus from 'vue-bus';
Vue.use(bus);

import App from './App.vue';

let VueMaterial = require('vue-material');
Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  },
});

new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  // Model,
  render: h => h(App)
})
