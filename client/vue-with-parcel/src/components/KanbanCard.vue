<template>
  <div class="card">
    <h5 class="card-title">{{task.title}}</h5>
    <p class="card-text">{{task.description}}</p>
    <div class="card-footer">
      <p style="margin-left:0;">created by: {{task.User.fullname}}</p>
      <small></small>
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
        <!-- <i
          @click="editTask"
          class="fa fa-pencil"
          aria-hidden="true"
          v-b-modal.modal-prevent-closing
        ></i>&nbsp;-->
        <i @click="deleteTask" class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
    <!-- modal edit -->
    <!-- <b-modal
      id="modal-prevent-closing"
      ref="modal"
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
    </b-modal>-->
  </div>
</template>

<script>
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
        url: `http://localhost:3000/tasks/${this.task.id}`,
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
          console.log("this is error:", err);
        });
    },

    deleteTask() {
      axios({
        url: `http://localhost:3000/tasks/${this.task.id}`,
        method: "DELETE",
        headers: {
          access_token: this.access_token
        },
        data: {}
      })
        .then(response => {
          console.log("berhasil delete");
          this.$emit("fetchData");
        })
        .catch(err => {
          console.log(err);
        });
    }
    // editTask() {
    //   axios({
    //     url: `http://localhost:3000/tasks/${this.task.id}`,
    //     method: "PUT",
    //     headers: {
    //       access_token: this.access_token
    //     },
    //     data: {
    //       title: this.title,
    //       description: this.description,
    //       category: this.task.category
    //     }
    //   })
    //     .then(response => {
    //       this.$("fetchData");
    //       console.log("success editing");
    //     })
    //     .catch(err => {
    //       console.log("this is error", err);
    //     });
    // },
    // resetModal() {
    //   this.title = "";
    //   this.description = "";
    // },
    // handleOk(bvModalEvt) {
    //   bvModalEvt.preventDefault();
    //   this.handleSubmit();
    // },
    // handleSubmit() {
    //   this.editTask();
    //   this.$nextTick(() => {
    //     this.$bvModal.hide("modal-prevent-closing");
    //   });
    // }
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
  color: #084177;
  font-size: 11px;
  font-family: "Merienda One", cursive;
  margin-left: 2px;
}
.card-footer {
  display: flex;
  justify-content: space-between;
}
i {
  font-size: 15px;
  color: #e8505b;
}

i:hover {
  color: blue;
}

.small-icon {
  display: flex;
  align-items: baseline;
}
a {
  font-family: "Merienda One", cursive;
}
label {
  font-family: "Merienda One", cursive;
  margin-left: 15px;
}
</style>