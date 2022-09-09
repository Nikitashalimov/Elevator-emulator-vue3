export const controllerModule = {
	state: {
		// Общее количество этажей
		allLevel: 5,
		// Позиция лифта
		elevatorLevel: 1,
	},
	getters: {},
	mutations: {
		// Изменение позиции лифта
		changeElevatorLevel(state, newLevel) {
			state.elevatorLevel = newLevel;
		}
	},
	actions: {}
};
