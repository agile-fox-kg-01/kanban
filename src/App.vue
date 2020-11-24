<template>
  <div class="appnew">
    <LoginForm
      v-if="isPage == 'login'"
      v-on:toDashboard="toDashboard"
      v-on:toRegisterForm="toRegisterForm"
      v-on:toError="toError"
    ></LoginForm>
    <RegisterForm
      v-else-if="isPage == 'register'"
      v-on:toDashboard="toDashboard"
      v-on:toLoginForm="toLoginForm"
      v-on:toError="toError"
    ></RegisterForm>
    <Error v-else-if="isPage == 'error'" v-on:toDashboard="toDashboard"></Error>
    <Dashboard
      v-else
      v-on:toDashboard="toDashboard"
      v-on:toLoginForm="toLoginForm"
      v-on:toError="toError"
    ></Dashboard>
  </div>
</template>

<script>
import axios from './api/axios'
import LoginForm from './views/Login'
import RegisterForm from './views/Register'
import Dashboard from './views/Dashboard'
import Error from './views/Error'

export default {
  name: 'App',
  data () {
    return {
      isPage: 'login'
    }
  },
  methods: {
    toDashboard () {
      this.isPage = 'dashboard'
    },
    toLoginForm () {
      this.isPage = 'login'
    },
    toRegisterForm () {
      this.isPage = 'register'
    },
    toError () {
      this.isPage = 'error'
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isPage = 'dashboard'
    } else {
      this.isPage = 'login'
    }
  },
  components: {
    LoginForm,
    RegisterForm,
    Dashboard,
    Error
  }
}
</script>

<style>
</style>
