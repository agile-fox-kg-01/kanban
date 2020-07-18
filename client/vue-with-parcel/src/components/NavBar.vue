<template>
  <div class="background">
    <!-- navbar -->
    <div class="custom-navbar">
      <div class="navbar-mid">
        <img id="brand" src="../../src/assets/img/kanbanWhite.png" alt />
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
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.removeItem("access_token");
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
  margin-top: 10px;
  background-color: white;
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
}

.navbar-mid {
  width: 83.333333%;
  padding-top: 5px;
  margin-left: 40%;
}

.navbar-right {
  width: 16.666667%;
  display: flex;
  align-items: center;
  margin-right: 50px;
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