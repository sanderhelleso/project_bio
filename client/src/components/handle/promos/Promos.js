import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { HandleSeeMorePromosCard } from '../../styles/Card';

import { getPromos } from '../../../api/promo/promo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Promos = ({ userID }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		promos: [],
		offset: 1, // keep tracks of where to fetch next batch from, start at 1 to exclude most recent
		limit: 9 // num of promos to fetch at a time
	});

	const { loading, promos, limit, offset } = state;

	useEffect(() => {
		loadPromos();
	}, []);

	const loadPromos = async () => {
		updateState({ loading: true });

		const response = await getPromos(userID, offset, limit);

		updateState({ loading: false });
	};

	const renderPromos = () => {
		return promos.map((promo) => null);
	};

	return (
		<HandleSeeMorePromosCard>
			{renderPromos()}
			{loading && <p>Loading...</p>}
		</HandleSeeMorePromosCard>
	);
};

const mapStateToProps = ({ profile: { viewing: { userID } } }) => {
	return { userID };
};

export default connect(mapStateToProps, null)(Promos);
