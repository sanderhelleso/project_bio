import ENDPOINTS from '../endpoints';
import API from '../api';

export async function createPromo(data) {
	try {
		const response = await API.post(ENDPOINTS.createPromo, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function uploadPromo(data) {
	try {
		const response = await API.put(ENDPOINTS.uploadPromo, data, {
			headers: {
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`
			}
		});
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function getPromo(handle, id) {
	try {
		const response = await API.get(ENDPOINTS.getPromo(handle, id));
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function getPromos(userID, offset, limit) {
	const params = { offset, limit };

	try {
		const response = await API.get(ENDPOINTS.getPromos(userID), { params });
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function getRecentPromo(userID) {
	try {
		const response = await API.get(ENDPOINTS.getRecentPromo(userID));
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
