import { ADD_TO_HISTORY } from '../actions/actionTypes';

const MAX_LEN = 5;
const initialState = { history: [] };

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_HISTORY: {
			const history = state.history;
			if (history.length + 1 > MAX_LEN) {
				history.pop();
			}

			history.unshift(action.payload);

			return {
				...state,
				history
			};
		}

		default:
			return state;
	}
};
