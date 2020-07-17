<template>
  <div class="container" id="register-page-section" v-if="currentPage == 'register-page'">
    <div class="register-login-box">
      <h2 class="display-3" style="text-align: center;">Sign Up</h2>
      <form>
        <div class="form-group">
          <label for="register-email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="register-email"
            aria-describedby="emailHelp"
            v-model="registerEmail"
          />
        </div>
        <div class="form-group">
          <label for="register-username">Username</label>
          <input
            type="text"
            class="form-control"
            id="register-username"
            aria-describedby="emailHelp"
            v-model="registerUsername"
          />
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input
            type="password"
            class="form-control"
            id="register-password"
            v-model="registerPassword"
          />
        </div>
        <button type="submit" class="btn btn-secondary" v-on:click.prevent="submitRegister">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register-form",
  props: {
    currentPage: String,
    server: String
  },
  data() {
    return {
      registerEmail: "",
      registerUsername: "",
      registerPassword: ""
    };
  },
  methods: {
    submitRegister() {
      axios
        .post(`${this.$props.server}/user/register`, {
          email: this.registerEmail,
          username: this.registerUsername,
          password: this.registerPassword
        })
        .then(response => {
          console.log(response.data);
          this.$emit("checkLogin");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>