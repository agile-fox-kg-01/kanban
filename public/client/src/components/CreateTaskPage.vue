<template>
  <div
    class="modal fade"
    id="create-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    v-if="openModal == 'create-modal'"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <AlertMessage :errorMessage="errorMessage"></AlertMessage>
        <div class="modal-header">
          <h5 class="modal-title" id="create-modal-title">New Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="create-task-section">
          <form>
            <div class="form-group">
              <label for="create-task-title" class="col-form-label">Title:</label>
              <input
                type="text"
                class="form-control"
                id="create-task-title"
                v-model="createTask.title"
              />
            </div>
            <div class="form-group">
              <label for="create-task-description" class="col-form-label">Description:</label>
              <textarea
                class="form-control"
                id="create-task-description"
                v-model="createTask.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="create-task-member" class="col-form-label">Member:</label>
              <input
                type="text"
                class="form-control"
                id="create-task-member"
                v-model="createTask.member"
              />
            </div>
            <div class="form-group">
              <label for="create-task-category" class="col-form-label">Category:</label>
              <select id="create-task-category" class="form-control">
                <option>-- Choose --</option>
                <option value="backlog" v-if="taskCategory == 'backlog'" selected>Backlog</option>
                <option value="backlog" v-if="taskCategory !== 'backlog'">Backlog</option>
                <option value="product" v-if="taskCategory == 'product'" selected>Product</option>
                <option value="product" v-if="taskCategory !== 'product'">Product</option>
                <option
                  value="development"
                  v-if="taskCategory == 'development'"
                  selected
                >Development</option>
                <option value="development" v-if="taskCategory !== 'development'">Development</option>
                <option value="done" v-if="taskCategory == 'done'" selected>Done</option>
                <option value="done" v-if="taskCategory !== 'done'">Done</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-secondary" v-on:click="submitCreateTask">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from "./AlertMessage.vue";

export default {
  name: "create-page",
  props: {
    openModal: String,
    taskCategory: String,
    server: String
  },
  data() {
    return {
      createTask: {
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
    submitCreateTask() {
      axios
        .post(
          `${this.server}/task`,
          {
            title: this.createTask.title,
            description: this.createTask.description,
            member: this.createTask.member,
            category: this.taskCategory
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(response => {
          this.createTask = {
            title: "",
            description: "",
            member: "",
            category: ""
          };
          this.$emit("checkLogin");
        })
        .catch(error => {
          let msgErr = error.response.data.message;
          this.errorMessage = msgErr;
          console.log(msgErr);
        });
    }
  },
  beforeCreate() {},
  created() {}
};
</script>

<style>
</style>