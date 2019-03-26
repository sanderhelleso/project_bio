import ENDPOINTS from '../endpoints';
import API from '../api';

export async function fetchProfile() {

    try {
        const response = await API.get(ENDPOINTS.profileByID)

        console.log(response);
        return response.data
    }

    catch(error) {
        console.log(error.response);
        return error.response.data
    }
}

export async function createProfile(data) {

    try {
        const response = await API.post(
            ENDPOINTS.newProfile,
            data
        )

        console.log(response);
        return response.data
    }

    catch(error) {
        console.log(error.response);
        return error.response.data
    }
}