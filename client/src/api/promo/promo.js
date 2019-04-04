import ENDPOINTS from '../endpoints';
import API from '../api';

export async function createPromo(data) {
	try {
		const response = await API.post(ENDPOINTS.createPromo, data);

		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
