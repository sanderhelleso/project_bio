import ENDPOINTS from '../endpoints';
import API from '../api';
import bearerToken from '../../lib/bearerToken';

export async function fetchProfile() {

    try {
        const response = await API.get(ENDPOINTS.profileByID)

        console.log(response);
        //return response.data
    }

    catch(error) {
        console.log(error.response);
        //return error.response.data
    }
}