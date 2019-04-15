import ENDPOINTS from '../endpoints';
import API from '../api';

export async function createComment(data) {
	try {
		const response = await API.post(ENDPOINTS.createComment, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
