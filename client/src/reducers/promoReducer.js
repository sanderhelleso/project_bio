import { 
    CREATE_PROMO, UPDATE_PROMO, DELETE_PROMO, LIKE_PROMO,
    UNLIKE_PROMO, COMMENT_PROMO, UNCOMMENT_PROMO 
} from '../actions/actionTypes';

const defaultState = { promos: 0 }

export default (state = defaultState, action) => {
    switch(action.type) {
        case CREATE_PROMO:
            return {
                state
            }

        case UPDATE_PROMO:
            return {
                state
            }

        case DELETE_PROMO:
            return {
                state
            }

        case LIKE_PROMO:
            return {
                state
            }

        case UNLIKE_PROMO:
            return {
                state
            }

        case COMMENT_PROMO:
            return {
                state
            }

        case UNCOMMENT_PROMO:
            return {
                state
            }

        default:
            return state;
    }
}

