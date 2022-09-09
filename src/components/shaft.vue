<template>
  <div class="shaft_level">{{ shaftNumber }}</div>
</template>

<script>
export default {
  name: "levelShaft",
  props: {
    shaftNumber: {
      type: Number,
    },
  },
};
</script>

<style scoped>
.shaft_level {
  height: 100px;
  width: 70px;
}

.shaft_level:not(:first-child) {
  border-bottom: 0.5px solid gray;
}
</style>