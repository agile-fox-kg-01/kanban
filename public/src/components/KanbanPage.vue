<template>
  <div id="kanban-section" v-if="currentPage == 'kanban-page'">
    <!-- Title -->
    <div class="title text-wrap font-weight-bolder">
      <h3>My Kanban Board</h3>
    </div>

    <!-- Container -->
    <div id="kanban-container">
      <div class="container-item" id="backlog-task">
        <h5>Backlog</h5>
        <div class="card" style="width: 18rem;" v-for="item in backlogTask" :key="item.id">
          <KanbanCard
            :item="item"
            :openModal="openModal"
            :server="server"
            @checkLogin="checkLogin"
            @empty_update_task="empty_update_task"
            @update_task="update_task(item.id, item.title, item.description, item.member, item.category)"
            @openEditModal="openEditModal"
          ></KanbanCard>
        </div>
        <button
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#create-modal"
          v-on:click="create_task_category('backlog')"
        >Add new Card</button>
      </div>
      <div class="container-item">
        <h5>Product</h5>
        <div class="card" style="width: 18rem;" v-for="item in productTask" :key="item.id">
          <KanbanCard
            :item="item"
            :openModal="openModal"
            :server="server"
            @checkLogin="checkLogin"
            @empty_update_task="empty_update_task"
            @update_task="update_task(item.id, item.title, item.description, item.member, item.category)"
            @openEditModal="openEditModal"
          ></KanbanCard>
        </div>
        <button
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#create-modal"
          v-on:click="create_task_category('product')"
        >Add new Card</button>
      </div>
      <div class="container-item">
        <h5>Development</h5>
        <div class="card" style="width: 18rem;" v-for="item in developmentTask" :key="item.id">
          <KanbanCard
            :item="item"
            :openModal="openModal"
            :server="server"
            @checkLogin="checkLogin"
            @empty_update_task="empty_update_task"
            @update_task="update_task(item.id, item.title, item.description, item.member, item.category)"
            @openEditModal="openEditModal"
          ></KanbanCard>
        </div>
        <button
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#create-modal"
          v-on:click="create_task_category('development')"
        >Add new Card</button>
      </div>
      <div class="container-item">
        <h5>Done</h5>
        <div class="card" style="width: 18rem;" v-for="item in doneTask" :key="item.id">
          <KanbanCard
            :item="item"
            :openModal="openModal"
            :server="server"
            @checkLogin="checkLogin"
            @empty_update_task="empty_update_task"
            @update_task="update_task(item.id, item.title, item.description, item.member, item.category)"
            @openEditModal="openEditModal"
          ></KanbanCard>
        </div>
        <button
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#create-modal"
          v-on:click="create_task_category('done')"
        >Add new Card</button>
      </div>
    </div>

    <!-- Modal Create Task -->

    <CreateTaskPage
      :openModal="openModal"
      :taskCategory="taskCategory"
      :server="server"
      @checkLogin="checkLogin"
    ></CreateTaskPage>

    <!-- Modal Edit-Delete Task -->
    <EditDeleteTaskPage
      :openModal="openModal"
      :editTask="editTask"
      :server="server"
      @checkLogin="checkLogin"
      @empty_update_task="empty_update_task"
    ></EditDeleteTaskPage>
  </div>
</template>

<script>
import CreateTaskPage from "./CreateTaskPage.vue";
import KanbanCard from "./KanbanCard.vue";
import EditDeleteTaskPage from "./EditDeleteTaskPage.vue";

export default {
  name: "kanban-page",
  props: {
    currentPage: String,
    task: Array,
    backlogTask: Array,
    productTask: Array,
    developmentTask: Array,
    doneTask: Array,
    server: String
  },
  data() {
    return {
      openModal: "",
      taskCategory: "",
      editTask: {
        id: "",
        title: "",
        description: "",
        member: "",
        category: ""
      }
    };
  },
  components: {
    CreateTaskPage,
    KanbanCard,
    EditDeleteTaskPage
  },
  methods: {
    create_task_category(category) {
      this.openModal = "create-modal";
      this.taskCategory = category;
    },
    checkLogin() {
      this.$emit("checkLogin");
    },
    openEditModal() {
      this.openModal = "edit-modal";
    },
    update_task(id, title, description, member, category) {
      this.openModal = "edit-modal";
      this.editTask.id = id;
      this.editTask.title = title;
      this.editTask.description = description;
      this.editTask.member = member;
      this.editTask.category = category;
    },
    empty_update_task() {
      this.editTask = {
        id: "",
        title: "",
        description: "",
        member: "",
        category: ""
      };
    }
  },
  beforeCreate() {},
  created() {
    this.checkLogin();
  }
};
</script>

<style>
</style>