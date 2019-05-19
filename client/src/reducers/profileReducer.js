import {
	SET_PROFILE,
	CREATE_PROFILE,
	UPDATE_PROFILE,
	CREATE_AVATAR,
	DELETE_AVATAR,
	VIEW_PROFILE
} from '../actions/actionTypes';

const initialState = {
	created: false,
	handle: '',
	avatar: '',
	name: '',
	bio: '',
	instagramURL: '',
	viewing: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PROFILE:
			return {
				...state,
				...action.payload
			};

		case CREATE_PROFILE:
			return {
				state
			};

		case UPDATE_PROFILE:
			return {
				state
			};

		case CREATE_AVATAR:
			return {
				...state,
				avatar: action.payload
			};

		case DELETE_AVATAR:
			return {
				state
			};

		case VIEW_PROFILE:
			return {
				...state,
				viewing: action.payload
			};

		default:
			return state;
	}
};
