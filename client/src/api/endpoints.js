const ENDPOINTS = {
	login: 'users/login',
	profileByID: 'profiles/get',
	profileByHandle: 'profiles/handle',
	newProfile: 'profiles/new',
	uploadAvatar: 'profiles/avatar',
	createPromo: 'promos/new',
	uploadPromo: 'promos/products/image',
	createComment: 'comments/new',
	checkFavorite: 'favorites/check',
	createFavorite: 'favorites/new',
	removeFavorite: 'favorites/delete',
	findRecomendations: 'promos/recomendations',
	followProfile: 'followers/new',
	unfollowProfile: 'followers/delete',

	// dynamic endpoints with params
	getPromo: (handle, id) => `promos/${handle}/${id}`,
	getPromos: (handle) => `promos/${handle}`,
	getComments: (id) => `comments/${id}`,
	getCommentsCount: (id) => `comments/${id}/count`
};

export default ENDPOINTS;
