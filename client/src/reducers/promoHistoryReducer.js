import { ADD_TO_HISTORY } from '../actions/actionTypes';

import Queue from '../lib/queue';

const LEN = 5;
const initialState = { history: new Queue(LEN) };

export default ({ history } = initialState, action) => {
	switch (action.type) {
		case ADD_TO_HISTORY: {
			history.add(action.payload);
			return {
				history: history.makeCopy(history)
			};
		}

		default:
			return state;
	}
};
