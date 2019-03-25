import ENDPOINTS from '../endpoints';
import API from '../api';

export async function login(email, password) {

    const data = { email, password }

    try {
        const response = await API.post(ENDPOINTS.login, data)
        return response.data
    }

    catch(error) {
        return error.response.data
    }
}