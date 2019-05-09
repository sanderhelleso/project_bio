import ENDPOINTS from '../endpoints';
import API from '../api';

export async function checkFavorite(data) {
	try {
		const response = await API.post(ENDPOINTS.checkFavorite, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function createFavorite(data) {
	try {
		const response = await API.post(ENDPOINTS.createFavorite, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function removeFavorite(data) {
	try {
		const response = await API.post(ENDPOINTS.removeFavorite, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
