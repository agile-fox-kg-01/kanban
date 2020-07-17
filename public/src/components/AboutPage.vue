<template>
  <div class="container" id="about-section-page" v-if="currentPage == 'about-page'">
    <div class="jumbotron">
      <h1 class="display-4">Hello !</h1>
      <p class="lead">This is a simple kanban list project</p>
      <hr class="my-4" />
      <p>Technology used in this project :</p>
      <div class="container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/480px-Bootstrap_logo.svg.png"
          class="img-thumbnail rounded"
        />
        <img
          src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg"
          class="img-thumbnail rounded"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
          class="img-thumbnail rounded"
        />
        <img
          src="https://www.postgresql.org/media/img/about/press/elephant.png"
          class="img-thumbnail rounded"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about-page",
  props: {
    currentPage: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>