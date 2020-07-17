<template>
  <div class="card-body">
    <h5 class="card-title">{{item.title}}</h5>
    <a
      href="#"
      class="card-link"
      data-toggle="modal"
      data-target="#edit-modal"
      v-on:click="update_task(item)"
    >Detail</a>
  </div>
</template>

<script>
export default {
  name: "kanban-card",
  props: {
    item: Object,
    openModal: String,
    server: String
  },
  data() {
    return {
      editTask: {
        id: "",
        title: "",
        description: "",
        member: "",
        category: ""
      }
    };
  },
  components: {},
  methods: {
    update_task() {
      this.$emit("update_task");
    },
    checkLogin() {
      this.$emit("checkLogin");
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}
};
</script>

<style>
</style>