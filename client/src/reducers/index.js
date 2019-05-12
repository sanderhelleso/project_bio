import { combineReducers } from 'redux';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import promoReducer from './promoReducer';
import promoHistoryReducer from './promoHistoryReducer';
import followerReducer from './followerReducer';

const appReducer = combineReducers({
	user: userReducer,
	profile: profileReducer,
	promos: promoReducer,
	promosHistory: promoHistoryReducer,
	followers: followerReducer
});

export default (state, action) => {
	// on logout, reset state
	if (action.type === 'LOGOUT') {
		navigator.credentials.preventSilentAccess();
		state = undefined;
	}

	return appReducer(state, action);
};
