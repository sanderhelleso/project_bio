import axios from 'axios';
import bearerToken from '../lib/bearerToken';

const api = axios.create({
	baseURL: 'http://localhost:5000/api/v1/',
	timeout: 5000,
	headers: bearerToken()
});

api.interceptors.request.use(
	(config) => {
		config.headers = bearerToken();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default api;
