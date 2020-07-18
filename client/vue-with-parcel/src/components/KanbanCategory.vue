<template>
  <div class="row">
    <div class="col">
      <h1 class="category-tag">{{title}}</h1>
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :categories="categories"
        @fetchData="fetchData"
      ></KanbanCard>
    </div>
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
.row {
  /* flex: 0 0 auto;
  width: 20%; */
  /* display: flex;
  flex-direction: column; */
  margin: 10px;
  margin-top: 70px;
  height: 100%;
}
.col {
  /* align-items: center; */

  /* margin: 50px 15px; */
  background-color: plum;
  font-size: 20px;
  /* text-align: center; */

  border-radius: 10px;
  /* margin: 10px; */
  /* justify-content: space-between; */
}

.category-tag {
  margin-top: 5px;
  margin-bottom: 0px;
  font-family: "Merienda One", cursive;
}
</style>
