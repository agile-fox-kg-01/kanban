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
        <button v-google-signin-button="clientId" class="google-signin-button">
          <img src="../assets/img/google.png" class="google-icon" />
        </button>
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
          <b-form-input id="email-register" type="email" v-model="emailRegister" required></b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password-register"
          invalid-feedback="Password is required"
        >
          <b-form-input id="password-register" type="password" v-model="passwordRegister" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AuthForm",
  data() {
    return {
      clientId:
        "1055302973797-hmk5egb2bet4an28hekh0d2nt0hdk84p.apps.googleusercontent.com",
      name: "",
      submittedNames: [],
      emailLogin: "",
      passwordLogin: "",
      emailRegister: "",
      passwordRegister: "",
      fullname: ""
    };
  },
  directives: {
    GoogleSignInButton
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      axios({
        url: `https://kanban-server-app.herokuapp.com//login/google`,
        method: `POST`,
        headers: {
          google_token: idToken
        }
      })
        .then(response => {
          localStorage.setItem("access_token", response.data.access_token);
          this.$emit("hasLogin");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });

          // console.log(err.response.data);
        });
    },
    OnGoogleAuthFail(error) {
      // console.log(error);
    },

    login() {
      axios({
        url: `https://kanban-server-app.herokuapp.com/login`,
        method: "POST",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(response => {
          console.log(response.data);
          const access_token = response.data.access_token;
          localStorage.setItem("access_token", access_token);
          this.$emit("hasLogin");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
          console.log(err.response.data);
        });
    },

    register() {
      axios({
        url: `https://kanban-server-app.herokuapp.com/register`,
        method: "POST",
        data: {
          fullname: this.fullname,
          email: this.emailRegister,
          password: this.passwordRegister
        }
      })
        .then(response => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "you can login now",
            showConfirmButton: false,
            timer: 1600
          });
          console.log("berhasil register");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
          console.log(err.response.data);
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
  margin-top: 100px;
}

.login-container:hover {
  background-color: #ffe2ff;
}

#btn-container {
  display: flex;
  margin: 25px;
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
  margin-top: 20px;
  font-family: "Merienda One", cursive;
}
h2 {
  font-family: "Merienda One", cursive;
  margin: auto;
  outline: none;
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

.google-signin-button {
  font-family: "Merienda One", cursive;
  color: blue;
  font-size: 17px;
  background-color: #ffe2ff;
  margin-right: 20px;
  outline: none;
  /* border-radius: 30px; */
  /* padding: 10px 20px 25px 20px; */
  box-shadow: 0 4px 8px 0 rgba(202, 24, 178, 0.2),
    0 6px 20px 0 rgba(221, 7, 203, 0.19);
}

.google-icon {
  width: 40px;
}
</style>