import ENDPOINTS from '../endpoints';
import API from '../api';

export async function getHandle(handle) {
	try {
		const response = await API.get(ENDPOINTS.getHandle(handle));
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
