<template>
  <div class="container-fluid login-page">
    <div class="col-12">
      <div class="alert alert-danger alert-dismissible collapse" role="alert" id="alertError">
        <a href="/" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>{{errorStatus}}</strong> {{errorMsg}}
      </div>
      <form @submit.prevent="loginForm">
        <h1>Login</h1>
        <div class="form-group">
          <label for="login-email">Email address</label>
          <input type="email" class="form-control" id="login-email" v-model="email"  aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" class="form-control" id="login-password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <a v-on:click="registerBtn"><span class="btn btn-warning">Register Page</span></a>
        <div class="form-group form-check">
          <label class="form-check-label">Login via Google</label>
          <div id="google-signin-button"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
        errorStatus: '',
        errorMsg: ''
      }
    },
    mounted() {
      gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
      })
    },
    methods: {
        loginForm() {
          axios({
            method: 'post',
            url: 'https://aarsandi-kanband.herokuapp.com/login',
            data: {
                email: this.email,
                password: this.password,
            }
          })
          .then(res => {
            localStorage.setItem('token', res.data.token)
            this.$emit('toDashboard')
          })
          .catch(err => {
            if(err.response.status == '400') {
              $('#alertError').show()
              this.errorStatus = err.response.status
              this.errorMsg = err.response.data.errors
            } else if (err.response.status == '401') {
              $('#alertError').show()
              this.errorStatus = err.response.status
              this.errorMsg = err.response.data.errors
            } else {
              this.$emit('toError')
            }
          })
        },
        onSignIn(user) {
          const google_token = user.getAuthResponse().id_token;
          // console.log(google_token)
          axios({
            method: 'post',
            url: `http://localhost:3000/login/google`,
            headers: {
              google_token
            }
          })
          .then(res => {
            localStorage.setItem('token', res.data.token)
            this.$emit('toDashboard')
          })
          .catch(err => {
            if(err.response.status == '400') {
              $('#alertError').show()
              this.errorStatus = err.response.status
              this.errorMsg = err.response.data.errors
            } else if (err.response.status == '401') {
              $('#alertError').show()
              this.errorStatus = err.response.status
              this.errorMsg = err.response.data.errors
            } else {
              this.$emit('toError')
            }
          })
        },
        registerBtn() {
          this.$emit('toRegisterForm')
        }
    }
}
</script>

<style>

</style>