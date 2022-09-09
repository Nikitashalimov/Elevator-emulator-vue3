<template>
  <div class="building">
    <div class="shaft">
      <shaft v-for="item in this.level" :key="item" :shaftNumber="item"></shaft>
    </div>
    <div class="floorColumn">
      <floor v-for="item in this.level" :key="item" :floorNumber="item"></floor>
    </div>
  </div>
</template>

<script>
import floor from "@/components/floor.vue";
import shaft from "@/components/shaft.vue";

export default {
  name: "building",
  data() {
    return {
      level: 5,
    };
  },
  components: {
    floor,
    shaft,
  },
};
</script>

<style scoped>
.building {
  margin: auto;
  border: 3px solid gray;
  display: flex;
  justify-content: center;
  paddin-top: 0;
}

.shaft {
  display: flex;
  flex-direction: column-reverse;
  border-right: 0.5px solid gray;
}

.floorColumn {
  display: flex;
  flex-direction: column-reverse;
}
</style>
