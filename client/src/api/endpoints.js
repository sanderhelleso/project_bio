const ENDPOINTS = {
	login: 'users/login',
	profileByID: 'profiles/get',
	newProfile: 'profiles/new',
	uploadAvatar: 'profiles/avatar',
	createPromo: 'promos/new',
	uploadPromo: 'promos/products/image',
	createComment: 'comments/new',
	getPromo: (handle, id) => `promos/${handle}/${id}`,
	getPromos: (handle) => `promos/${handle}`,
	getComments: (id) => `comments/${id}`
};

export default ENDPOINTS;
