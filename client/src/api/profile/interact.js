import ENDPOINTS from '../endpoints';
import API from '../api';

export async function follow(data) {
	try {
		const response = await API.post(ENDPOINTS.followProfile, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function unfollow(data) {
	try {
		const response = await API.post(ENDPOINTS.unfollowProfile, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}

export async function checkReleationship(data) {
	try {
		const response = await API.post(ENDPOINTS.releationship, data);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return error.response.data;
	}
}
