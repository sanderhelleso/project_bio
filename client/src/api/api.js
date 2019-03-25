import axios from 'axios';
import bearerToken from '../lib/bearerToken';

export default axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    timeout: 1000,
    headers: {
        ...bearerToken()
    }
});