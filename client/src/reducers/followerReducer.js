import { FOLLOW_USER, UNFOLLOW_USER } from '../actions/actionTypes';

const initialState = { following: 0, followers: 0 };

export default (state = initialState, action) => {
    switch(action.typpe) {
        case FOLLOW_USER:
            return {
                state
            }

        case UNFOLLOW_USER:
            return {
                state
            }

        default:
            return state;
    }
}