import React from 'react';
import { Favorite } from '../../styles/Icon';
import { createFavorite } from '../../../api/promo/favorite';

const FavoritePromo = () => {
	const favorite = async () => {
		const response = await createFavorite({});
		console.log(response);
	};

	return (
		<span className="no-select" onClick={() => favorite()}>
			<Favorite />
		</span>
	);
};

export default FavoritePromo;
