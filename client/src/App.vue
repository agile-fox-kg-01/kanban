<template>
  <div>
    <AuthForm @hasLogin="changePage(true)" v-if="!isLoggedIn"></AuthForm>
    <KanbanBoard
      v-else
      :categories="categories"
      :tasks="tasks"
      @afterCreate="fetchData"
      @fetchData="fetchData"
      @hasLogout="changePage(false)"
    ></KanbanBoard>
  </div>
</template>

<script>
import axios from "axios";
import AuthForm from "./components/AuthForm";
import KanbanBoard from "./components/KanbanBoard";

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      categories: ["Back-log", "Todo", "Doing", "Done"],
      tasks: []
    };
  },
  components: {
    AuthForm,
    KanbanBoard
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLoggedIn = true;
      this.fetchData();
    }
  },

  methods: {
    changePage(status) {
      this.isLoggedIn = status;
      if (status == true) {
        this.fetchData();
      }
    },

    fetchData() {
      axios({
        url: `https://kanban-server-app.herokuapp.com/tasks`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          this.tasks = response.data.tasks;
          // console.log(response.data.tasks);
        })
        .catch(err => {
          // console.log(err.response);
        });
    }
  }
};
</script>

<style scoped>
</style>

// :todos="todos"