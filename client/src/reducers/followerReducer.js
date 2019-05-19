import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '../actions/actionTypes';

const initialState = { following: 0, followers: 0 };

export default (state = initialState, action) => {
	switch (action.typpe) {
		case FOLLOW_PROFILE:
			return {
				state
			};

		case UNFOLLOW_PROFILE:
			return {
				state
			};

		default:
			return state;
	}
};
