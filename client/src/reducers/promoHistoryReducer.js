import { ADD_TO_HISTORY } from '../actions/actionTypes';

import Queue from '../lib/queue';

const LEN = 5;
const initialState = { history: new Queue(LEN) };

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_HISTORY: {
			state.history.add(action.payload);
			return {
				...state,
				history: state.history.makeCopy(state.history)
			};
		}

		default:
			return state;
	}
};
