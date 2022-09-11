<template>
  <div class="floor">
    <button
      class="button"
      :disabled="this.currentLevel === floorNumber"
      :class="{
        button_call: this.includesLevel(floorNumber),
        button_this_call:
          this.currentLevel === floorNumber && this.status === 'active',
        button_arrived:
          this.currentLevel === floorNumber && this.status === 'arrived',
      }"
      type="button"
      @click="callUpElevator()"
    ></button>
    <p class="numberFloor">{{ floorNumber }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "floor",
  props: ["floorNumber"],
  computed: {
    ...mapState({
      currentLevel: (state) => state.controller.elevators[0].currentLevel,
      nextLevel: (state) => state.controller.elevators[0].elevatorLevels[0],
      status: (state) => state.controller.elevators[0].elevatorStatus,
    }),
    ...mapGetters([
      "getCurrentElevatorLevel",
      "includesLevel",
      "getElevatorStatus",
    ]),
  },
  methods: {
    ...mapMutations([
      "addElevatorLevels",
      "changeElevatorStatus",
      "changeElevatorSpeed",
      "changeDirection",
    ]),
    callUpElevator() {
      if (
        !this.includesLevel(this.floorNumber) &&
        this.getCurrentElevatorLevel(0) != this.floorNumber &&
        this.getElevatorStatus() === "wait"
      ) {
        this.addElevatorLevels(this.floorNumber);
        this.changeElevatorStatus("start");
      } else if (!this.includesLevel(this.floorNumber)) {
        this.addElevatorLevels(this.floorNumber);
      }
    },
  },
};
</script>

<style scoped>
.floor {
  height: 100px;
  width: 200px;
  display: flex;
  align-items: center;
}

.floor:not(:first-child) {
  border-bottom: 0.5px solid gray;
}

.button {
  cursor: pointer;
  background-image: url("/src/assets/icons-button.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.button_call {
  background-image: url("/src/assets/icons-button-call.png");
  background-color: rgb(193, 193, 255);
}

.button_this_call {
  background-image: url("/src/assets/icons-button-arrived.png");
  background-color: rgb(174, 218, 174);
}

.button_arrived {
  background-image: url("/src/assets/icons-button-arrived.png");
  background-color: rgb(44, 63, 44);
}

.numberFloor {
  margin-left: 10px;
}
</style>
