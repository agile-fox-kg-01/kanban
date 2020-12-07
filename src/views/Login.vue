<template>
    <div class="container login-page">
        <div class="row align-items-center justify-content-between">
          <div class="col-lg-6 about-component">
            <div class="feature-ele text-center">
                <img src="img/complete_task.svg" alt="">
                <h2>KanbanApp</h2>
                <p>To help manage your tasks and your group task everyday . .</p>
            </div>
          </div>
          <div class="col-lg-6 card my-5">
            <div class="card-body">
              <form @submit.prevent="loginForm">
                <h1>Sign In</h1>
                <div class="form-group">
                  <label for="login-email">Email address</label>
                  <input type="email" class="form-control" id="login-email" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <label for="login-password">Password</label>
                  <input type="password" class="form-control" id="login-password" v-model="password" placeholder="Password">
                  <small id="errorMessage" class="form-text text-muted collapse">{{errorMsg}}</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <a v-on:click="registerBtn"><span class="btn btn-danger mx-2">Create Account</span></a>
                <div class="form-group form-check my-3">
                  <a v-on:click="onSignIn"><span class="btn btn-warning"><i class="fa fa-google"></i>  SignIn</span></a>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios'

export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
        errorMsg: ''
      }
    },
    methods: {
        loginForm() {
          axios({
            method: 'post',
            url: '/login',
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
            if (err.response) {
              $('#errorMessage').show()
              this.errorMsg = err.response.data.error
            } else {
              this.$emit("toError");
            }
          })
        },
        onSignIn() {
          this.$gAuth.signIn().then(token => {
            const googletoken = token.getAuthResponse()
            return axios({
              method: 'post',
              url: '/login/google',
              headers: {
                google_token: googletoken.id_token
              }
            })
          })
          .then(res => {
            localStorage.setItem('token', res.data.token)
            this.$emit('toDashboard')
          })
          .catch(err => {
            if (err.response) {
              $('#errorMessage').show()
              this.errorMsg = err.response.data.error
            } else {
              this.$emit("toError");
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
