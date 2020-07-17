<template>
  <div class="container" id="login-page-section" v-if="currentPage == 'login-page'">
    <AlertMessage :errorMessage="errorMessage"></AlertMessage>

    <div class="register-login-box">
      <h2 class="display-3" style="text-align: center;">Login</h2>
      <form>
        <div class="form-group">
          <label for="login-email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="login-email"
            placeholder="email address"
            required
            aria-describedby="emailHelp"
            v-model="loginEmail"
          />
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input
            type="password"
            class="form-control"
            id="login-password"
            v-model="loginPassword"
            placeholder="password"
          />
        </div>
        <div class="buttons">
          <button
            type="submit"
            class="btn btn-secondary submit-button"
            v-on:click.prevent="submitLogin"
          >Submit</button>
          <div id="google-signin-button"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AlertMessage from "./AlertMessage.vue";

export default {
  name: "login-form",
  props: {
    currentPage: String,
    server: String
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      errorMessage: []
    };
  },
  components: {
    AlertMessage
  },
  methods: {
    submitLogin() {
      axios
        .post(`${this.$props.server}/user/login`, {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          this.errorMessage = "";
          this.emptyLogin();
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("checkLogin");
        })
        .catch(error => {
          let msgErr = error.response.data.message;
          this.errorMessage = [msgErr];
          this.$emit("checkLogin");
        });
    },
    emptyLogin() {
      this.loginEmail = "";
      this.loginPassword = "";
    },
    onSignIn(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;

      axios
        .post(
          `${this.server}/user/login/google`,
          {},
          {
            headers: {
              access_token: id_token
            }
          }
        )
        .then(response => {
          localStorage.setItem("access_token", id_token);
          localStorage.setItem("username", response.data.username);
          console.log("google signin");
          this.$emit("checkLogin");
        })
        .catch(err => {
          console.log("google gagal");
          console.log(err);
        });
    },
    googleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
        this.$emit("checkLogin");
      });
    }
  },
  beforeCreate() {},
  create() {},
  beforeMount() {},
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  }
};
</script>

<style>
</style>