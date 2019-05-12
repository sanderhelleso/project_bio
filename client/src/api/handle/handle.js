import ENDPOINTS from '../endpoints';
import API from '../api';

export async function getHandle(handle) {
	const params = { handle };

	try {
		const response = await API.get(ENDPOINTS.profileByHandle, { params });
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
