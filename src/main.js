import Vue from 'vue'
import App from './App.vue'

// fill your google outh client id
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
