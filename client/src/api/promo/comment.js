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

export async function getComments(id, offset, limit) {
	const params = { offset, limit };

	try {
		const response = await API.get(ENDPOINTS.getComments(id), { params });
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function getCommentsCount(id) {
	try {
		const response = await API.get(ENDPOINTS.getCommentsCount(id));
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
