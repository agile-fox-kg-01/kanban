import './node_modules/bootstrap/dist/css/bootstrap.css'
import './node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import Vue from './node_modules/vue';
import App from './App.vue';

import BootstrapVue from './node_modules/bootstrap-vue'

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app');