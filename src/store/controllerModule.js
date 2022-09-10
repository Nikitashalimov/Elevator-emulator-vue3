export const controllerModule = {
	state: {
		// Общее количество этажей
		allLevel: 5,
		// // Позиция лифта
		// elevatorLevel: 1,
		// Лифты
		elevators: [
			{
				// Индекс шахты лифта
				index: 0,
				// Очередь лифта (куда ехать)
				elevatorLevel: [1],
				// Скорость движения лифта
				elevatorSpeed: 1,
			}
		],
	},
	getters: {
		// Получить elevatorLevel по индексу
		getElevatorLevel: (state) => (index) => {
			return state.elevators[index].elevatorLevel[0]
		},
		// Получить elevatorSpeed по индексу
		getElevatorSpeed: (state) => (index) => {
			return state.elevators[index].elevatorSpeed
		},
	},
	mutations: {
		// Изменение позиции лифта
		changeElevatorLevel(state, newLevel) {
			// Добавляем новый этаж
			state.elevators[0].elevatorLevel.push(newLevel);
			console.log(state.elevators[0].elevatorLevel);

			// Вычисляем время движения лифта
			state.elevators[0].elevatorSpeed = Math.abs((state.elevators[0].elevatorSpeed) - (state.elevators[0].elevatorLevel[1]));
			console.log(state.elevators[0].elevatorSpeed);

			// Удаляем первый запрос на этаж
			state.elevators[0].elevatorLevel.shift();
			console.log(state.elevators[0].elevatorLevel);
		}
	},
	actions: {}
};
