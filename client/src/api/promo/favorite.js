import ENDPOINTS from '../endpoints';
import API from '../api';

export async function createFavorite(data) {
	try {
		const response = await API.post(ENDPOINTS.createFavorite, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
