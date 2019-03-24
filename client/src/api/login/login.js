import axios from 'axios'
import ENDPOINTS from '../endpoints';
import API from '../api';

export default async function login(email, password) {

    const data = { email, password }

    try {
        const response = await API.post(ENDPOINTS.login, data)
        return response
    }

    catch(error) {
        console.log(error)
        return error.response
    }
}