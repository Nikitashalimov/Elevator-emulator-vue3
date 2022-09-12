<template>
  <div class="shaft">
    <div class="shaft_level" v-for="item in allLevel" :key="item"></div>
    <div
      ref="elevatorBox"
      class="elevator_box"
      :style="[speedMove, move]"
      :class="{
        arrived: this.elevatorStatus === 'arrived',
      }"
    >
      <div v-if="this.getNextLevel()" class="tab_info">
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
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      currentLevel: (state) => state.controller.currentLevel,
      elevatorSpeed: (state) => state.controller.elevatorSpeed,
      elevatorStatus: (state) => state.controller.elevatorStatus,
      direction: (state) => state.controller.direction,
    }),
    ...mapGetters(["getNextLevel"]),
    speedMove() {
      return `transition: transform ${this.elevatorSpeed}s`;
    },
    move() {
      return `transform: translateY(${(this.currentLevel - 1) * -100}px)`;
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
      this.changeElevatorSpeed(
        Math.abs(this.getNextLevel() - this.currentLevel)
      );
      this.changeDirection(
        this.getNextLevel() > this.currentLevel ? "up" : "down"
      );
      this.changeElevatorStatus("active");
      this.changeCurrentLevel(this.getNextLevel());
      this.$refs.elevatorBox.ontransitionend = () => {
        this.changeElevatorStatus("arrived");
        setTimeout(() => {
          this.changeElevatorStatus("wait");
          this.deleteElevatorLevel();
          if (this.getNextLevel()) this.runElevator();
        }, 3000);
      };
    },
  },
  watch: {
    elevatorStatus(newStatus) {
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
  animation-timing-function: linear;
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

@keyframes blinkBox {
  0% {
    background-color: blue;
  }
  25% {
    background-color: rgb(137, 137, 244);
  }
  50% {
    background-color: blue;
  }
  75% {
    background-color: rgb(137, 137, 244);
  }
  100% {
    background-color: blue;
  }
}

.arrived {
  animation-name: blinkBox;
  animation-timing-function: linear;
  animation-duration: 3s;
}
</style>