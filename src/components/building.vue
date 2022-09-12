<template>
  <div class="building">
    <shaft
      v-for="(item, index) in elevators"
      :key="item"
      :indexShaft="index"
    ></shaft>
    <div class="floorColumn">
      <floor v-for="item in allLevel" :key="item" :floorNumber="item"></floor>
    </div>
  </div>
</template>

<script>
import floor from "@/components/floor.vue";
import shaft from "@/components/shaft.vue";
import { mapState } from "vuex";

export default {
  name: "building",
  components: {
    floor,
    shaft,
  },
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      elevators: (state) => state.controller.elevators,
    }),
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
