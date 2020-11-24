<template>
  <div class="dashboard">
    <SidebarNav
      v-on:toLoginForm="toLoginForm"
      v-on:toError="toError"
      v-on:toContentGroupTask="toContentGroupTask"
      v-on:toContentMyTask="toContentMyTask"
      v-on:toNewGroup="toNewGroup"
      :groups="groups"
    ></SidebarNav>
    <ContentMyTask
      v-if="contentPage == 'myTask'"
      :tasks="myTasks"
      v-on:toError="toError"
      v-on:toLoginForm="toLoginForm"
      v-on:toContentMyTask="toContentMyTask"
    ></ContentMyTask>
    <NewGroup
      v-else-if="contentPage == 'newGroup'"
      v-on:toError="toError"
      v-on:toLoginForm="toLoginForm"
      v-on:fetchDataGroups="fetchDataGroups"
      v-on:toContentGroupTask="toContentGroupTask"
    ></NewGroup>
    <ContentGroupTask
      v-else
      :dataGroup="dataGroup"
      :userData="userData"
      :tasks="dataGroup.Tasks"
      v-on:toError="toError"
      v-on:toLoginForm="toLoginForm"
      v-on:toContentGroupTask="toContentGroupTask"
      v-on:toContentMyTask="toContentMyTask"
    ></ContentGroupTask>
  </div>
</template>

<script>
import axios from "../api/axios";
import SidebarNav from "../components/SidebarNav";
import ContentMyTask from "../components/ContentMyTask";
import ContentGroupTask from "../components/ContentGroupTask";
import NewGroup from "../components/NewGroup";

export default {
  name: "Dashboard",
  data() {
    return {
      myTasks: [],
      userData: {},
      groups: [],
      contentPage: "myTask",
      dataGroup: {}
    };
  },
  methods: {
    fetchDataHome() {
      axios({
        method: "get",
        url: "/task",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          this.myTasks = res.data.myTasks;
          this.groups = res.data.groups;
          this.userData = res.data.user
        })
        .catch(err => {
          this.$emit("toError");
        });
    },
    fetchDataGroups() {
      axios({
        method: "get",
        url: "/group",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          this.groups = res.data;
        })
        .catch(err => {
          this.$emit("toError");
        });
    },
    fetchDataGroup(id) {
      axios({
        method: "get",
        url: `/group/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          this.dataGroup = res.data;
          this.contentPage = "groupTask";
        })
        .catch(err => {
          this.$emit("toError");
        });
    },
    toLoginForm() {
      this.$emit("toLoginForm");
    },
    toError() {
      this.$emit("toError");
    },
    toContentMyTask() {
      this.fetchDataHome();
      this.contentPage = "myTask";
    },
    toContentGroupTask(id) {
      this.fetchDataGroup(id);
    },
    toNewGroup() {
        this.contentPage = "newGroup";
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.fetchDataHome();
    } else {
      this.toLoginForm();
    }
  },
  components: {
    SidebarNav,
    ContentMyTask,
    ContentGroupTask,
    NewGroup
  }
};
</script>

<style>
.feature-ele {
  margin-top: 30px;
}
.feature-ele img {
  width: 85%;
}
.wrapper {
  margin-right: 0;
}

.content-header {
    background: rgba(0, 0, 0, 0.774);
    color: #fff;
}
.content-header h1 {
    display: inline;
}
.header-right-btn {
  margin-top: 15px;
  float: right;
}

@media (min-width: 100px) {
  .col-sm-card {
    flex: 0 0 auto;
    width: 83.333333%;
  }
}

@media (min-width: 668px) {
  .col-md-card {
    flex: 0 0 auto;
    width: 45%;
  }
}

@media (min-width: 992px) {
  .col-lg-card {
    flex: 0 0 auto;
    width: 25%;
  }
}

.task-list {
  border: 5px solid rgba(0, 0, 0, 0.774);
}

.scrollContent {
  height: 492px;
  margin-bottom: 0;
  overflow: auto;
}

.backlog-header {
  background: tomato;
  text-align: center;
  border-bottom: 5px solid rgba(0, 0, 0, 0.774);
}

.task-list h4 {
  font-weight: bold;
  margin-bottom: 0;
}

.todo-header {
  background-color: burlywood;
  text-align: center;
  border-bottom: 5px solid rgba(0, 0, 0, 0.774);
}

.doing-header {
  background-color: steelblue;
  text-align: center;
  border-bottom: 5px solid rgba(0, 0, 0, 0.774);
}

.done-header {
  background-color: yellowgreen;
  text-align: center;
  border-bottom: 5px solid rgba(0, 0, 0, 0.774);
}

.card-content {
  display: flex;
  flex-direction: column;
}

.task-item {
  position: relative;
  font-weight: bold;
  padding: 0px 30px 10px 30px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.774);
}

.task-item a {
  text-decoration: underline;
  color: rgba(0, 0, 0, 0.774);
}

.task-item p {
  color: #82817f;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-item h6 {
  border-top: 5px solid rgba(0, 0, 0, 0.774);
}

.task-item .left-btn {
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 40%;
  left: 5px;
}

.task-item .right-btn {
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 40%;
  right: 5px;
}

.goto-btn {
  border: 4px solid rgba(0, 0, 0, 0.774);
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.774);
}

/* ************ modal ************** */
.modal-content {
  background-color: black;
  color: white;
  font-weight: bolder;
}

.addtask-header {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 6px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.addtask-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

/* other */
.bg-image {
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
}

.jumbotron h1 {
  text-align: center;
  color: white;
  font-weight: bolder;
}

.jumbotron p {
  text-align: center;
  color: white;
  font-weight: bolder;
}
</style>