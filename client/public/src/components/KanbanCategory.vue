<template>
  <div class="col-sm-6 col-md-4 col-lg-2">
    <div class="category-tag">
      <h1>{{title}}</h1>
    </div>
    <KanbanCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :categories="categories"
      @fetchData="fetchData"
    ></KanbanCard>
  </div>
</template>


<script>
import KanbanCard from "./KanbanCard";
export default {
  name: "KanbanCategory",
  props: {
    title: String,
    tasks: Array,
    categories: Array
  },
  components: {
    KanbanCard
  },
  methods: {
    fetchData() {
      this.$emit("fetchData");
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 1100px) {
  .col-md-2 {
    flex: 0 0 auto;
    width: 20%;
  }
}
@media only screen and (max-width: 800px) {
  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}

@media only screen and (max-width: 700px) {
  .col-sm-6 {
    flex: 0 0 auto;
    width: 90%;
  }
}

.col-lg-2 {
  background-color: plum;
  font-size: 20px;
  border-radius: 10px;
  margin: 10px;
  height: 100%;
}

.category-tag {
  margin-top: 5px;
  margin-bottom: 0px;
  font-family: "Merienda One", cursive;
}
</style>
