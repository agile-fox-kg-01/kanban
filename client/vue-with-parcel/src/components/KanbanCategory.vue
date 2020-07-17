<template>
  <div class="col-md">
    <h1 class="category-tag">{{title}}</h1>
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
.col-md {
  flex: 0 0 auto;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 50px 15px;
  background-color: plum;
  font-size: 20px;
  text-align: center;
  height: 100%;
  border-radius: 10px;
}

.category-tag {
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
