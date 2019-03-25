import { combineReducers } from 'redux';
import userReducer from './userReducer';

const appReducer = combineReducers({ 
    // future reducers go here
    userReducer
});

export default (state, action) => {

    // logout
    if (action.type === 'LOGOUT') {
        navigator.credentials.preventSilentAccess();
        state = undefined;
    }

    return appReducer(state, action)
}