<template>
  <div>
    <div v-for="(item, index) in errorMessage" :key="index">
      <div
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
        v-if="errorMessage !== ''"
      >
        <strong>{{item}}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert-message",
  props: {
    errorMessage: Array
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.alert {
  margin: 10px;
}
</style>