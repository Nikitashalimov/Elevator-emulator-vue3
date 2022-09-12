<template>
  <div class="settings">
    <input
      v-model="newAllLevel"
      class="settings_input"
      placeholder="Введите количество этажей..."
      type="number"
      v-on:keyup.enter="changeLevel(this.newAllLevel)"
    />
    <button
      class="settings_button"
      type="button"
      @click="changeLevel(this.newAllLevel)"
    >
      ОК
    </button>
  </div>
  <div class="building">
    <shaft></shaft>
    <div class="floor_column">
      <floor v-for="item in allLevel" :key="item" :floorNumber="item"></floor>
    </div>
  </div>
</template>

<script>
import floor from "@/components/floor.vue";
import shaft from "@/components/shaft.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    floor,
    shaft,
  },
  name: "building",
  data() {
    return {
      newAllLevel: "",
    };
  },
  computed: {
    ...mapState({
      allLevel: (state) => state.controller.allLevel,
      elevators: (state) => state.controller.elevators,
    }),
  },
  methods: {
    ...mapMutations(["changeAllLevel", "resetCurrentLevel"]),
    changeLevel(newAllLevel) {
      if (newAllLevel < 2) {
        this.resetCurrentLevel();
        this.changeAllLevel(2);
        this.newAllLevel = "";
      } else {
        this.resetCurrentLevel();
        this.changeAllLevel(this.newAllLevel);
        this.newAllLevel = "";
      }
    },
  },
};
</script>

<style scoped>
.building {
  border: 3px solid gray;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.shaft {
  display: flex;
  flex-direction: column-reverse;
  border-right: 0.5px solid gray;
}

.floor_column {
  display: flex;
  flex-direction: column-reverse;
}

.settings {
  display: flex;
  width: 250px;
  height: 25px;
  margin-left: auto;
}

.settings_input {
  width: 100%;
  outline: none;
  border: 1px solid gray;
  padding-left: 3px;
}

.settings_input::placeholder {
  color: blue;
}

.settings_button {
  width: 40px;
  background-color: gray;
  color: blue;
}
</style>
