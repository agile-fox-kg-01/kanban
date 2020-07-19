<template>
  <div v-if class="card">
    <h5 class="card-title">{{task.title}}</h5>
    <p class="card-text">{{task.description}}</p>
    <div class="card-footer">
      <p class="createdBy">created by: {{task.User.fullname}}</p>
      <div class="small-icon">
        <div class="dropdown">
          <a
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-sort-desc" aria-hidden="true"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <label style>move into:</label>
            <a
              class="dropdown-item"
              href="#"
              v-for="category in (categories.filter(category => category !== task.category))"
              :key="category.id"
              @click="moveTaskCategory(category)"
            >{{category}}</a>
          </div>
        </div>&nbsp;
        <i class="fa fa-pencil" @click="editTask(task)"></i>&nbsp;
        <i @click="deleteTask" class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>

    <!-- modal edit -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "KanbanCard",
  data() {
    return {
      title: null,
      description: null,
      access_token: localStorage.getItem("access_token")
    };
  },
  props: {
    task: Object,
    categories: Array
  },
  methods: {
    moveTaskCategory(category) {
      axios({
        url: `https://kanban-server-app.herokuapp.com/tasks/${this.task.id}`,
        method: "PATCH",
        headers: {
          access_token: this.access_token
        },
        data: {
          category: category
        }
      })
        .then(response => {
          console.log("success move category");
          this.$emit("fetchData");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops... Sorry!",
            text: `${err.response.data.message}`
          });
          console.log("this is error:", err);
        });
    },

    deleteTask() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to roll back time!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#24a19c",
        cancelButtonColor: "#d45079",
        confirmButtonText: "Yes,never mind!"
      }).then(result => {
        if (result.value) {
          axios({
            url: `https://kanban-server-app.herokuapp.com/${this.task.id}`,
            method: "DELETE",
            headers: {
              access_token: this.access_token
            },
            data: {}
          })
            .then(response => {
              // console.log("success deleted");
              this.$emit("fetchData");
              Swal.fire("Deleted!", "Your task has been deleted.");
            })
            .catch(err => {
              Swal.fire({
                icon: "error",
                title: "Oops... Sorry!",
                text: `${err.response.data.message}`
              });
              console.log(err);
            });
        }
      });
    },

    editTask(task) {
      const { value: text } = Swal.fire({
        input: "textarea",
        inputPlaceholder: "Edit description here...",
        inputAttributes: {
          "aria-label": "edit description here"
        },
        showCancelButton: false
      }).then(text => {
        axios({
          url: `https://kanban-server-app.herokuapp.com/tasks/${task.id}`,
          method: "PUT",
          headers: {
            access_token: this.access_token
          },
          data: {
            title: task.title,
            description: text.value,
            category: task.category
          }
        })
          .then(response => {
            this.$emit("fetchData");
            // console.log("success editing", response.data);
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "success edit task",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Oops... Sorry!",
              text: `${err.response.data.message}`
            });

            // console.log("this is error", err.response);
          });
      });
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
      this.editTask();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<style scoped>
.card {
  margin: 5px 0px;
  border-radius: 5px;
}

.card-title {
  font-size: 18px;
  margin: 2px 5px;
  text-align: left;
  color: #24a19c;
  font-family: "Merienda One", cursive;
}

.card-text {
  font-size: 13px;
  text-align: left;
  margin: 5px;
  font-family: "Merienda One", cursive;
}
p {
  color: #9d0b0b;
  font-size: 11px;
  font-family: "Merienda One", cursive;
  margin-left: 2px;
}
.card-footer {
  display: flex;
  padding: 5px;
  justify-content: space-between;
}
i {
  outline: none;
  font-size: 15px;
  color: #e8505b;
}

i:hover {
  color: blue;
}
.createdBy {
  margin-left: 0;
  color: #0f4c75;
}
.small-icon {
  display: flex;
  align-items: baseline;
  /* align-self: flex-end; */
}
a {
  font-family: "Merienda One", cursive;
}
label {
  font-family: "Merienda One", cursive;
  margin-left: 15px;
}
</style>