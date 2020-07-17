<template>
  <div class="navigation" id="navigation-user-section" v-if="isLogin == true">
    <div class="navigation-left">
      <a href id="user-nav" data-toggle="modal" data-target="#user-modal">
        <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
      </a>
      <p>{{userName}}</p>
    </div>
    <div class="nagivation-mid">
      <a href id="home-nav" v-on:click.prevent="home_nav">Home</a>
      <a href id="about-nav" v-on:click.prevent="about_nav">About</a>
      <a href id="kanban-nav" v-on:click.prevent="kanban_nav">Kanban</a>
    </div>
    <div class="navigation-right">
      <a href v-on:click.prevent="logout_nav">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-login",
  props: {
    currentPage: String,
    isLogin: Boolean,
    userName: String
  },
  data() {
    return {};
  },
  methods: {
    home_nav() {
      this.$emit("home_nav");
    },
    about_nav() {
      this.$emit("about_nav");
    },
    kanban_nav() {
      this.$emit("kanban_nav");
    },
    googleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        event.preventDefault()
      });
    },
    logout_nav() {
      if (gapi.auth2) {
        this.googleSignOut()
      }
      this.$emit("logout_nav");
    }
  }
};
</script>

<style>
</style>