export const controllerModule = {
	state: {
		// Общее количество этажей
		allLevel: 5,
		// Лифты
		elevators: [
			{
				currentLevel: 1,
				elevatorLevels: [],
				elevatorSpeed: 1,
				elevatorStatus: 'wait',
				direction: 'null',
			}
		],
	},
	getters: {
		getCurrentElevatorLevel: (state) => () => {
			return state.elevators[0].currentLevel;
		},
		getElevatorLevels: (state) => (index) => {
			return state.elevators[index].elevatorLevels;
		},
		includesLevel: (state) => (newLevel) => {
			return state.elevators[0].elevatorLevels.includes(newLevel);
		},
		nextLevel: (state) => () => {
			return state.elevators[0].elevatorLevels[0];
		},
		getElevatorSpeed: (state) => () => {
			return state.elevators[0].elevatorSpeed;
		},
		getElevatorStatus: (state) => () => {
			return state.elevators[0].elevatorStatus;
		},
		getDirection: (state) => () => {
			return state.elevators[0].direction;
		}
	},
	mutations: {
		changeCurrentLevel(state) {
			state.elevators[0].currentLevel = state.elevators[0].elevatorLevels[0];
		},
		addElevatorLevels(state, newLevel) {
			state.elevators[0].elevatorLevels.push(newLevel);
		},
		deleteElevatorLevel(state) {
			state.elevators[0].elevatorLevels.shift();
		},
		changeElevatorSpeed(state) {
			state.elevators[0].elevatorSpeed = Math.abs((state.elevators[0].currentLevel) - (state.elevators[0].elevatorLevels[0]));
		},
		changeElevatorStatus(state, newStatus) {
			if (state.elevators[0].elevatorLevels.length === 0) {
				state.elevators[0].elevatorStatus = 'wait'
			} else {
				state.elevators[0].elevatorStatus = newStatus;
			}
		},
		changeDirection(state) {
			if (state.elevators[0].elevatorLevels[0] > state.elevators[0].currentLevel) {
				state.elevators[0].direction = "up";
			} else {
				state.elevators[0].direction = "down";
			}
		},
	},
	actions: {}
};
