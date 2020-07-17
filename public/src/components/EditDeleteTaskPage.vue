<template>
  <div
    class="modal fade"
    id="edit-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    v-if="openModal == 'edit-modal'"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <AlertMessage :errorMessage="errorMessage"></AlertMessage>
        <div class="modal-header">
          <h5 class="modal-title" id="edit-modal-title">Edit Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="edit-task-section">
          <form>
            <div class="form-group">
              <label for="edit-task-title" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="edit-task-title" v-model="editTask.title" />
            </div>
            <div class="form-group">
              <label for="edit-task-description" class="col-form-label">Description:</label>
              <textarea
                class="form-control"
                id="edit-task-description"
                v-model="editTask.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="edit-task-member" class="col-form-label">Member:</label>
              <input
                type="text"
                class="form-control"
                id="edit-task-member"
                v-model="editTask.member"
              />
            </div>
            <div class="form-group">
              <label for="edit-task-category" class="col-form-label">Category:</label>
              <select id="edit-task-category" class="form-control" v-model="editTask.category">
                <option>-- Choose --</option>
                <option value="backlog" v-if="editTask.category == 'backlog'" selected>Backlog</option>
                <option value="backlog" v-if="editTask.category !== 'backlog'">Backlog</option>
                <option value="product" v-if="editTask.category == 'product'" selected>Product</option>
                <option value="product" v-if="editTask.category !== 'product'">Product</option>
                <option
                  value="development"
                  v-if="editTask.category == 'development'"
                  selected
                >Development</option>
                <option value="development" v-if="editTask.category !== 'development'">Development</option>
                <option value="done" v-if="editTask.category == 'done'" selected>Done</option>
                <option value="done" v-if="editTask.category !== 'done'">Done</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" href="#" v-on:click="deleteTask">
            <i class="fa fa-trash-o fa-lg"></i>Delete
          </button>
          <button type="submit" class="btn btn-secondary" v-on:click="updateTaskSubmit">Update</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from "./AlertMessage.vue";

export default {
  name: "edit-page",
  props: {
    openModal: String,
    editTask: Object,
    server: String
  },
  data() {
    return {
      currentEditTask: {
        id: "",
        title: "",
        description: "",
        member: "",
        category: ""
      },
      errorMessage: []
    };
  },
  components: {
    AlertMessage
  },
  methods: {
    updateTaskSubmit() {
      axios
        .put(
          `${this.server}/task/${this.editTask.id}`,
          {
            title: this.editTask.title,
            description: this.editTask.description,
            member: this.editTask.member,
            category: this.editTask.category
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(response => {
          this.$emit("checkLogin");
        })
        .catch(err => {
          let msgErr = err.response.data.message;
          this.errorMessage = msgErr;
          console.log(err);
        });
    },
    deleteTask() {
      axios
        .delete(`${this.server}/task/${this.editTask.id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(response => {
          console.log(response.data);
          this.$emit("checkLogin");
        })
        .catch(err => {
          console.log(err);
        });
    },
    empty_update_task() {
      this.$emit("empty_update_task");
    }
  },
  beforeCreate() {
    this.$emit("empty_update_task");
  },
  created() {},
  beforeMount() {
    this.empty_update_task();
  }
};
</script>

<style>
</style>