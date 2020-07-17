<template>
  <div>
    <!-- login -->
    <div class="login-container">
      <div>
        <img id="logo" src="../assets/img/kanban.png" alt />
      </div>
      <form id="login-form" @submit.prevent="login">
        <label for="email-login"></label>
        <input type="email" id="email-login" placeholder="email" v-model="emailLogin" />
        <label for="password-login"></label>
        <input type="password" id="password-login" placeholder="password" v-model="passwordLogin" />
        <input type="submit" value="login" id="btn-input" />
      </form>
      <div id="btn-container">
        <div class="g-signin2 login-google" data-onsuccess="onSignIn"></div>
        <h2 id="register" v-b-modal.modal-prevent-closing>Register?</h2>
      </div>
      <p class="mt-5 mb-3 text-muted">© 2020-2021</p>
    </div>

    <!-- Modal register -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Register here:"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form class="register-container" ref="form" @submit.prevent="handleSubmit">
        <b-form-group
          label="Full Name"
          label-for="fullname-register"
          invalid-feedback="Full Name is required"
        >
          <b-form-input id="fullname-register" v-model="fullname" required></b-form-input>
        </b-form-group>

        <b-form-group label="Email" label-for="email-register" invalid-feedback="Email is required">
          <b-form-input id="email-register" v-model="emailRegister" required></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password-register"
          invalid-feedback="Password is required"
        >
          <b-form-input id="password-register" v-model="passwordRegister" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  data() {
    return {
      name: "",
      submittedNames: [],
      emailLogin: "",
      passwordLogin: "",
      emailRegister: "",
      passwordRegister: "",
      fullname: ""
    };
  },
  methods: {
    login() {
      axios({
        url: `http://localhost:3000/login`,
        method: "POST",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(response => {
          const access_token = response.data.access_token;
          localStorage.setItem("access_token", access_token);
          this.$emit("hasLogin");
        })
        .catch(response => {
          console.log(response);
        });
    },

    onSignIn(googleUser) {
      const google_token = googleUser.getAuthResponse().id_token;
      console.log(google_token);
      $.axios({
        url: `http://localhost:3000/login/google`,
        method: `POST`,
        headers: {
          google_token
        }
      })
        .then(response => {
          logInDisplay();
          console.log(response.token);
          localStorage.setItem("access_token", response.token);
        })
        .catch(response => {
          console.log(response);
          localStorage.setItem("access_token", response.token);
        });
    },

    googleSignOut() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
    },

    register() {
      axios({
        url: `http://localhost:3000/register`,
        method: "POST",
        data: {
          fullname: this.fullname,
          email: this.emailRegister,
          password: this.passwordRegister
        }
      })
        .then(response => {
          console.log("berhasil register");
        })
        .catch(response => {
          console.log(response);
        });
    },

    resetModal() {
      this.fullname = "";
      this.emailRegister = "";
      this.passwordRegister = "";
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.register();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  opacity: 0.9;
  width: 370px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  margin: auto;
  margin-top: 130px;
}

.login-container:hover {
  background-color: #ffe2ff;
}

#btn-container {
  display: flex;
  margin: 20px;
}

#btn-input {
  background-color: #c9b6e4;
  margin-top: 20px;
}

#login-form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#register {
  margin-left: 20px;
}

#register:hover {
  color: #7e0cf5;
}

#logo {
  margin-top: 30px;
  width: 200px;
  height: 80px;
}

p {
  margin-top: 30px;
  font-family: "Merienda One", cursive;
}
h2 {
  font-family: "Merienda One", cursive;
}
input {
  outline: none;
  font-family: "Merienda One", cursive;
  margin-top: 10px;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border-radius: 2rem;
}

/* register */
.register-container {
  font-family: "Merienda One", cursive;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: #ffe2ff;
  align-content: center;
  justify-content: center;
  padding: 30px;
  margin-left: 30px;
}

.register-container:hover {
  background-color: white;
  color: #916dd5;
  border-style: inset;
}
</style>