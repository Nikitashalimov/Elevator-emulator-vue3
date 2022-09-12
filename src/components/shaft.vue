<template>
  <div class="shaft">
    <div class="shaft_level" v-for="item in allLevel" :key="item"></div>
    <div
      ref="elevatorBox"
      class="elevator_box"
      :style="[speedMove, move]"
      :class="{
        arrived: this.getElevatorStatus(this.indexShaft) === 'arrived',
      }"
    >
      <div v-if="this.getNextLevel(this.indexShaft)" class="tab_info">
        <p>{{ this.getCurrentElevatorLevel(this.indexShaft) }}</p>
        <p v-if="this.getDirection(this.indexShaft) === 'up'">▲</p>
        <p v-if="this.getDirection(this.indexShaft) === 'down'">▼</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "levelShaft",
  props: ["indexShaft"],
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      elevators: (state) => state.controller.elevators,
    }),
    ...mapGetters([
      "getCurrentElevatorLevel",
      "getNextLevel",
      "getElevatorSpeed",
      "getElevatorStatus",
      "getDirection",
    ]),
    speedMove() {
      return `transition: transform ${this.getElevatorSpeed(this.indexShaft)}s`;
    },
    move() {
      return `transform: translateY(${
        (this.getCurrentElevatorLevel(this.indexShaft) - 1) * -100
      }px)`;
    },
    statusForWatcher() {
      return this.elevators[this.indexShaft].elevatorStatus;
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
        Math.abs(
          this.getNextLevel(this.indexShaft) -
            this.getCurrentElevatorLevel(this.indexShaft)
        )
      );
      this.changeDirection(
        this.getNextLevel(this.indexShaft) >
          this.getCurrentElevatorLevel(this.indexShaft)
          ? "up"
          : "down"
      );
      this.changeElevatorStatus("active");
      this.changeCurrentLevel(this.getNextLevel(this.indexShaft));
      this.$refs.elevatorBox.ontransitionend = () => {
        this.changeElevatorStatus("arrived");
        setTimeout(() => {
          this.changeElevatorStatus("wait");
          this.deleteElevatorLevel();
          if (this.getNextLevel(this.indexShaft)) this.runElevator();
        }, 3000);
      };
    },
  },
  watch: {
    statusForWatcher(newStatus) {
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