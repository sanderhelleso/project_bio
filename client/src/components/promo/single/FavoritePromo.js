import React, { useEffect, useState } from 'react';
import { Favorite } from '../../styles/Icon';
import { checkFavorite, createFavorite, removeFavorite } from '../../../api/promo/favorite';
import ReactTooltip from 'react-tooltip';

import { connect } from 'react-redux';

const FavoritePromo = ({ userID, ID }) => {
	const data = { userID, promoID: ID };

	const [ favorited, setFavorite ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	// check favorite releationship on load
	useEffect(() => {
		isFavorited();
	}, []);

	// checks if the user already have favorited promo
	const isFavorited = async () => {
		const response = await checkFavorite(data);

		// exists
		if (response.payload) {
			setFavorite(true);
		}

		setLoading(false);
	};

	// run favorite / unfavorite depending on state
	const favoriteAction = async () => {
		setLoading(true);

		await (favorited ? unfavorite() : favorite());

		setFavorite(!favorited);
		ReactTooltip.rebuild();

		setLoading(false);
	};

	const favorite = async () => await createFavorite(data); // create
	const unfavorite = async () => await removeFavorite(data); // remove

	return (
		<span className="no-select" disabled={loading} onClick={() => favoriteAction()}>
			{!loading && <Favorite favorited={favorited} message={favorited ? 'Unfavorite' : 'Favorite'} />}
		</span>
	);
};

const mapStateToProps = ({ profile: { userID }, promos: { viewing: { promo: { ID } } } }) => {
	return { userID, ID };
};

export default connect(mapStateToProps, null)(FavoritePromo);
