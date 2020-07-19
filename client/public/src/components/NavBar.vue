<template>
  <!-- navbar -->
  <div class="custom-navbar">
    <div class="navbar-mid">
      <img id="brand" src="../../assets/img/kanbanWhite.png" alt />
    </div>
    <div class="navbar-right">
      <div class="dropdown">
        <a
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a @click="logout" class="dropdown-item" href="#">Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import GoogleSignInButton from "vue-google-signin-button-directive";
export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
      console.log("User signed out.");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "See you again!",
        showConfirmButton: false,
        timer: 1500
      });
      this.$emit("hasLogout");
    }
  }
};
</script>

<style scoped>
.custom-navbar {
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
}

.navbar-mid {
  padding-top: 5px;
  margin: auto;
}

.navbar-right {
  margin-right: 100px;
  margin-top: 50px;
}
.navbar-right a {
  color: black;
}

#brand {
  width: 300px;
  height: 100px;
}

.dropdown-item {
  font-family: "Merienda One", cursive;
}
</style>