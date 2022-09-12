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
  min-height: 100vh;
  height: 100%;
  background-color: blanchedalmond;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
