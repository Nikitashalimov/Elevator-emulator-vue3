<template>
  <div class="floor">
    <button class="button_call" type="button" @click="callElevator()"></button>
    <p class="numberFloor">{{ floorNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "floor",
  props: {
    floorNumber: {
      type: Number,
    },
  },
  methods: {
    callElevator() {
      console.log(this.floorNumber);
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

.button_call {
  cursor: pointer;
  background-image: url("/src/assets/icons-button.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.numberFloor {
  margin-left: 10px;
}
</style>
