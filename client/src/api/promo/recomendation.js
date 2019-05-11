import ENDPOINTS from '../endpoints';
import API from '../api';

export async function findRecomendations(data) {
	try {
		const response = await API.post(ENDPOINTS.findRecomendations, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
