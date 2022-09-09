<template>
  <div class="app">
    <building></building>
  </div>
</template>

<script>
import building from "@/components/building.vue";

export default {
  components: {
    building,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

.app {
  padding: 10px;
  width: 100vw;
  height: 100vh;
  background-color: blanchedalmond;
  display: flex;
}
</style>
