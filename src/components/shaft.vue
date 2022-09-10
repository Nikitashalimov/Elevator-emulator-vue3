<template>
  <div class="shaft">
    <div class="shaft_level" v-for="item in allLevel" :key="item">
      {{ item }}
    </div>
    <div class="elevator_box" :style="[speedMove, move]">
      <div class="tab_info">{{ getElevatorLevel(index) }} ▲▼</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "levelShaft",
  props: ["index"],
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
    }),
    ...mapGetters(["getElevatorLevel", "getElevatorSpeed"]),
    // Стиль скорости движения лифта
    speedMove() {
      return `transition: transform ${this.getElevatorSpeed(this.index)}s`;
    },
    // Стиль для движения лифта
    move() {
      return `transform: translateY(${
        (this.getElevatorLevel(this.index) - 1) * -100
      }px)`;
    },
  },
};
</script>

<style scoped>
.shaft {
  display: flex;
  flex-direction: column-reverse;
  border-right: 0.5px solid gray;
}

.shaft_level {
  height: 100px;
  width: 70px;
}

.shaft_level:not(:first-child) {
  border-bottom: 0.5px solid gray;
}

.elevator_box {
  background-color: blue;
  height: 100px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.tab_info {
  margin: auto;
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 5px;
}
</style>