import { combineReducers } from 'redux';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import promoReducer from './promoReducer';
import followerReducer from './followerReducer';

const appReducer = combineReducers({ 
    userReducer,
    profileReducer,
    promoReducer,
    followerReducer
});

export default (state, action) => {

    // on logout, reset state
    if (action.type === 'LOGOUT') {
        navigator.credentials.preventSilentAccess();
        state = undefined;
    }

    return appReducer(state, action)
}