import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue';
import App from './App.vue';

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
// function onSignIn(googleUser) {
//   const google_token = googleUser.getAuthResponse().id_token;
//   console.log(google_token);
//   $.axios({
//     url: `http://localhost:3000/login/google`,
//     method: `POST`,
//     headers: {
//       google_token
//     }
//   })
//     .then(response => {
//       logInDisplay();
//       console.log(response);
//       localStorage.setItem("access_token", response.access_token);
//     })
//     .catch(response => {
//       console.log(response);
//       localStorage.setItem("access_token", response.access_token);
//     });
// }
new Vue({
  render: h => h(App),
}).$mount('#app');