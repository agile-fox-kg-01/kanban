<template>
  <div>
    <!-- content -->
    <NavBar @hasLogout="hasLogout"></NavBar>
    <button id="btn-add-task" v-b-modal.modal-prevent-closing>add task</button>
    <div class="container-fluid">
      <KanbanCategory
        v-for="(category,id) in categories"
        :key="id"
        :title="category"
        :tasks="tasks.filter(task=>
          task.category === category)"
        :categories="categories"
        @fetchData="fetchData"
      ></KanbanCategory>
    </div>
    <!-- add task modal-->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="What is your new task?"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" label-for="task-title" invalid-feedback="Title is required">
          <b-form-input id="task-title" v-model="title" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="task-description"
          invalid-feedback="Description is required"
        >
          <b-form-input id="task-description" v-model="description" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar";
import KanbanCategory from "./KanbanCategory";
import Swal from "sweetalert2";

export default {
  name: "KanbanBoard",
  data() {
    return {
      title: null,
      description: null
    };
  },
  components: {
    NavBar,
    KanbanCategory
  },
  props: {
    categories: Array,
    tasks: Array
  },
  methods: {
    hasLogout() {
      this.$emit("hasLogout");
    },
    resetModal() {
      this.title = "";
      this.description = "";
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.createNewTask();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },

    createNewTask() {
      axios({
        url: `https://kanban-server-app.herokuapp.com/tasks`,
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.title,
          description: this.description,
          category: "Back-log"
        }
      })
        .then(response => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "A new Back-log task added",
            showConfirmButton: false,
            timer: 1500
          });
          console.log("success created", response.data.newData);
          this.afterCreate();
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
          console.log(err.response);
        });
    },

    afterCreate() {
      this.$emit("afterCreate");
    },
    fetchData() {
      this.$emit("fetchData");
    }
  }
};
</script>

<style scoped>
form {
  font-family: "Merienda One", cursive;
}
.container-fluid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#btn-add-task {
  display: inline-table;
  border-radius: 6px;
  color: white;
  background-color: #eb6383;
  font-size: 12px;
  font-family: "Merienda One", cursive;
  width: 100px;
  height: 30px;
  margin-left: 40px;
  outline-color: aliceblue;
  border-color: white;
}

#btn-add-task:hover {
  background-color: #d92027;
  outline: none;
}

#task-title {
  border: none;
  border-radius: 0%;
  border-bottom: 1px solid;
  border-bottom: inset;
}

#task-description {
  outline: none;
}
</style>
