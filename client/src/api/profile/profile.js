import ENDPOINTS from '../endpoints';
import API from '../api';

export async function fetchProfile() {
	try {
		const response = await API.get(ENDPOINTS.profileByID);

		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function createProfile(data) {
	try {
		const response = await API.post(ENDPOINTS.newProfile, data);

		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function uploadAvatar(data) {
	try {
		const response = await API.put(ENDPOINTS.uploadAvatar, data, {
			headers: {
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`
			}
		});

		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
