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
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

body {
  font-family: 'Poppins', sans-serif;
  background: #fafafa;
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a, a:hover, a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */
#content {
  width: 85%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */
@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #content {
    width: 100%;
  }
}

</style>
