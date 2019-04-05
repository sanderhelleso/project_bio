import {
	CREATE_PROMO,
	UPDATE_PROMO,
	DELETE_PROMO,
	LIKE_PROMO,
	UNLIKE_PROMO,
	COMMENT_PROMO,
	UNCOMMENT_PROMO,
	VIEW_PROMO
} from '../actions/actionTypes';

const initialState = { amount: 0, list: {}, viewing: null };

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PROMO:
			return {
				...state,
				amount: state.amount + 1,
				list: {
					...state.list,
					...action.payload
				}
			};

		case UPDATE_PROMO:
			return {
				state
			};

		case DELETE_PROMO:
			return {
				state
			};

		case LIKE_PROMO:
			return {
				state
			};

		case UNLIKE_PROMO:
			return {
				state
			};

		case COMMENT_PROMO:
			return {
				state
			};

		case UNCOMMENT_PROMO:
			return {
				state
			};

		case VIEW_PROMO:
			return {
				...state,
				viewing: action.payload
			};

		default:
			return state;
	}
};
