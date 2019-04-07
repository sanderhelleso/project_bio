import {
	CREATE_PROMO,
	UPDATE_PROMO,
	DELETE_PROMO,
	LIKE_PROMO,
	UNLIKE_PROMO,
	COMMENT_PROMO,
	UNCOMMENT_PROMO,
	VIEW_PROMO,
	SET_PROMO_COMMENTS,
	UPDATE_PROMO_COMMENTS
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

		case SET_PROMO_COMMENTS:
			return {
				...state,
				viewing: {
					...state.viewing,
					comments: action.payload
				}
			};

		case UPDATE_PROMO_COMMENTS:
			return {
				...state,
				viewing: {
					...state.viewing,
					comments: [ ...state.viewing.comments, ...action.payload ]
				}
			};

		default:
			return state;
	}
};
