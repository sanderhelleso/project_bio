import { combineReducers } from 'redux';

const appReducer = combineReducers({ 
    // future reducers go here
});

export default (state, action) => {

    // logout
    if (action.type === 'LOGOUT') {
        navigator.credentials.preventSilentAccess();
        state = undefined;
    }

    return appReducer(state, action)
}