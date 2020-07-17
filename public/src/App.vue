<template>
  <div class="bg">
    <!-- Navigation -->
    <NavbarGuest
      :currentPage="currentPage"
      :isLogin="isLogin"
      @home_nav="home_nav"
      @register_nav="register_nav"
      @login_nav="login_nav"
    ></NavbarGuest>
    <NavbarLogin
      :currentPage="currentPage"
      :isLogin="isLogin"
      :userName="userName"
      @home_nav="home_nav"
      @about_nav="about_nav"
      @kanban_nav="kanban_nav"
      @logout_nav="logout_nav"
    ></NavbarLogin>

    <!-- User Form -->
    <RegisterForm :currentPage="currentPage" :server="server" @checkLogin="checkLogin"></RegisterForm>
    <LoginForm :currentPage="currentPage" :server="server" @checkLogin="checkLogin"></LoginForm>

    <!-- Login page -->
    <AboutPage :currentPage="currentPage"></AboutPage>
    <KanbanPage
      :currentPage="currentPage"
      :task="task"
      :backlogTask="backlogTask"
      :productTask="productTask"
      :developmentTask="developmentTask"
      :doneTask="doneTask"
      :server="server"
      @checkLogin="checkLogin"
    ></KanbanPage>
  </div>
</template>

<script>
import NavbarGuest from "./components/NavbarGuest.vue";
import NavbarLogin from "./components/NavbarLogin.vue";
import RegisterForm from "./components/RegisterForm.vue";
import LoginForm from "./components/LoginForm.vue";
import AboutPage from "./components/AboutPage.vue";
import KanbanPage from "./components/KanbanPage.vue";

export default {
  name: "App",
  data() {
    return {
      server: "https://project-2-kanban-app.herokuapp.com",
      isLogin: false,
      currentPage: "login-page",
      task: [],
      backlogTask: [],
      productTask: [],
      developmentTask: [],
      doneTask: [],
      userName: ""
    }
  },
  components: {
    NavbarGuest,
    NavbarLogin,
    RegisterForm,
    LoginForm,
    AboutPage,
    KanbanPage
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("access_token")) {
        this.userName = localStorage.getItem("username");
        this.isLogin = true;
        this.getUserTask();
        this.currentPage = "kanban-page";
      } else {
        this.isLogin = false;
        this.emptyTask();
        this.currentPage = "login-page";
      }
    },
    emptyTask() {
      this.task = [];
      this.backlogTask = [];
      this.productTask = [];
      this.developmentTask = [];
      this.doneTask = [];
    },
    getUserTask() {
      this.emptyTask();
      axios
        .get(`${this.server}/task`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(response => {
          this.task = response.data;
          this.sortTaskByCategory();
        })
        .catch(err => {
          console.log(err);
        });
    },
    sortTaskByCategory() {
      this.task.map(item => {
        if (item.category == "backlog") {
          this.backlogTask.push(item);
        } else if (item.category == "product") {
          this.productTask.push(item);
        } else if (item.category == "development") {
          this.developmentTask.push(item);
        } else if (item.category == "done") {
          this.doneTask.push(item);
        }
      });
    },
    //Navigation
    home_nav() {
      if (localStorage.getItem("access_token")) {
        this.currentPage = "kanban-page";
      } else {
        this.currentPage = "login-page";
      }
    },
    register_nav() {
      this.currentPage = "register-page";
    },
    login_nav() {
      this.currentPage = "login-page";
    },
    about_nav() {
      this.currentPage = "about-page";
    },
    kanban_nav() {
      this.currentPage = "kanban-page";
      this.checkLogin();
    },
    logout_nav() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      this.checkLogin();
    },
    // computed: {},
    // watch: {},

    //Lifecycle
    beforeCreate() {},
    created() {
      this.checkLogin();
    },
    beforeMount() {},
    mounted() {}
  }
};
</script>

<style scoped>
</style>