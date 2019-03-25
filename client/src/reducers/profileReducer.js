import { CREATE_PROFILE, UPDATE_PROFILE, CREATE_AVATAR, DELETE_AVATAR } from '../actions/actionTypes';

const initialState = {
    created: false,
    handle: '',
    avatar: '',
    name: '',
    bio: '',
    instagramURL: ''
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CREATE_PROFILE:
            return {
                state
            }

        case UPDATE_PROFILE:
            return {
                state
            }

        case CREATE_AVATAR:
            return {
                state
            }

        case DELETE_AVATAR:
            return {
                state
            }

        default:
            return state;
    }
}