import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { getRecentPromo } from '../../../api/promo/promo';

import { HandleRecentPromoCard } from '../../styles/Card';
import { connect } from 'react-redux';

const Recent = ({ userID }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		promo: null
	});

	const { loading, promo } = state;

	useEffect(() => {
		loadRecentPromo();
	}, []);

	const loadRecentPromo = async () => {
		const response = await getRecentPromo(userID);
		console.log(response);

		updateState({ loading: false });
	};

	return <HandleRecentPromoCard>recent</HandleRecentPromoCard>;
};

const mapStateToProps = ({ profile: { viewing: { userID } } }) => {
	return { userID };
};

export default connect(mapStateToProps, null)(Recent);
