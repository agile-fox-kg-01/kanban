import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const gauthOption = {
  clientId: '941386381500-uu5oq5fla8cpoar3qgf27c379jjlht7g.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app');

