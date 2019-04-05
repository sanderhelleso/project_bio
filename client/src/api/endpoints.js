const ENDPOINTS = {
	login: 'users/login',
	profileByID: 'profiles/get',
	newProfile: 'profiles/new',
	uploadAvatar: 'profiles/avatar',
	createPromo: 'promos/new',
	uploadPromo: 'promos/products/image',
	getPromo: (id) => `promos/${id}`,
	getPromos: (handle) => `promos/users/${handle}`
};

export default ENDPOINTS;
