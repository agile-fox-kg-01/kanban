<template>
  <div class="navigation" id="navigation-guest-section" v-if="isLogin == false">
    <div class="nagivation-mid">
      <a href id="home-nav" v-on:click.prevent="home_nav">Home</a>
      <a href id="register-nav" v-on:click.prevent="register_nav">Register</a>
      <a href id="login-nav" v-on:click.prevent="login_nav">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-guest",
  props: {
    currentPage: String,
    isLogin: Boolean
  },
  data() {
    return {};
  },
  methods: {
    home_nav() {
      this.$emit("home_nav");
    },
    register_nav() {
      this.$emit("register_nav");
    },
    login_nav() {
      this.$emit("login_nav");
    }
  }
};
</script>

<style>
</style>