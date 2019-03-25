import { LOGIN, LOGOUT } from '../actions/actionTypes';

const defaultState = { authenticated: false };

export default (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN: 
            return {
                state
            }

        case LOGOUT: 
            return {
                state
            }
        
        default:
            return state;
    }
}