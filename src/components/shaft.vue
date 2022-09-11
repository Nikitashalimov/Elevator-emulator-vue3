<template>
  <div class="shaft">
    <div class="shaft_level" v-for="item in allLevel" :key="item">
      {{ item }}
    </div>
    <div
      ref="elevatorBox"
      class="elevator_box"
      :style="[speedMove, move]"
      :class="{ arrived: this.getElevatorStatus === 'arrived' }"
    >
      <div v-if="this.nextLevel" class="tab_info">
        <p>{{ this.currentLevel }}</p>
        <p v-if="this.direction === 'up'">▲</p>
        <p v-if="this.direction === 'down'">▼</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "levelShaft",
  props: ["index"],
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      currentLevel: (state) => state.controller.elevators[0].currentLevel,
      nextLevel: (state) => state.controller.elevators[0].elevatorLevels[0],
      status: (state) => state.controller.elevators[0].elevatorStatus,
      speed: (state) => state.controller.elevators[0].speed,
      direction: (state) => state.controller.elevators[0].direction,
    }),
    ...mapGetters([
      "getElevatorSpeed",
      "getCurrentElevatorLevel",
      "getDirection",
      "getElevatorStatus",
    ]),
    speedMove() {
      return `transition: transform ${this.getElevatorSpeed()}s`;
    },
    move() {
      return `transform: translateY(${
        (this.getCurrentElevatorLevel(this.index) - 1) * -100
      }px)`;
    },
  },
  methods: {
    ...mapMutations([
      "changeCurrentLevel",
      "changeElevatorStatus",
      "deleteElevatorLevel",
      "changeElevatorSpeed",
      "changeDirection",
    ]),
    runElevator() {
      this.changeElevatorSpeed(Math.abs(this.nextLevel - this.currentLevel));
      this.changeDirection(this.nextLevel > this.currentLevel ? "up" : "down");
      this.changeElevatorStatus("active");
      this.changeCurrentLevel(this.nextLevel);
      this.$refs.elevatorBox.ontransitionend = () => {
        this.changeElevatorStatus("arrived");
        setTimeout(() => {
          this.changeElevatorStatus("wait");
          this.deleteElevatorLevel();
          if (this.nextLevel) this.runElevator();
        }, 3000);
      };
    },
  },
  watch: {
    status(newStatus) {
      if (newStatus === "start") {
        this.runElevator();
      }
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

.arrived {
  animation-name: blink;
  animation-timing-function: linear;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
</style>