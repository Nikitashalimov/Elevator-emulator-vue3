export const controllerModule = {
	state: {
		allLevel: 5,
		elevators: [
			{
				currentLevel: 1,
				elevatorLevels: [],
				elevatorSpeed: "1",
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
		getNextLevel: (state) => () => {
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
		changeCurrentLevel(state, newLevel) {
			state.elevators[0].currentLevel = newLevel;
		},
		addElevatorLevels(state, newLevel) {
			state.elevators[0].elevatorLevels.push(newLevel);
		},
		deleteElevatorLevel(state) {
			state.elevators[0].elevatorLevels.shift();
		},
		changeElevatorSpeed(state, newSpeed) {
			state.elevators[0].elevatorSpeed = newSpeed;
		},
		changeElevatorStatus(state, newStatus) {
			state.elevators[0].elevatorStatus = newStatus;
		},
		changeDirection(state, newDirection) {
			state.elevators[0].direction = newDirection;
		},
	},
	actions: {}
};
