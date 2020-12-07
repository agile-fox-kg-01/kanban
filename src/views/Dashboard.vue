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
    <b-sidebar id="sidebar-1" title="Kanban" shadow>
      <SidebarNavToggle
        v-on:toLoginForm="toLoginForm"
        v-on:toError="toError"
        v-on:toContentGroupTask="toContentGroupTask"
        v-on:toContentMyTask="toContentMyTask"
        v-on:toNewGroup="toNewGroup"
        :groups="groups"
      ></SidebarNavToggle>
    </b-sidebar>
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
import SidebarNavToggle from "../components/SidebarNavToggle";
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
    NewGroup,
    SidebarNavToggle
  }
};
</script>

<style>
</style>
