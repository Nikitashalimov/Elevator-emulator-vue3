<template>
  <div class="shaft">
    <div class="shaft_level" v-for="item in allLevel" :key="item">
      {{ item }}
    </div>
    <div class="elevator_box">
      <div class="tab_info">{{ elevatorLevel }} ▲▼</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "levelShaft",
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      elevatorLevel: (state) => state.controller.elevatorLevel,
    }),
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