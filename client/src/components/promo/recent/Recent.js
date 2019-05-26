import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { getRecentPromo } from '../../../api/promo/promo';

import { HandleRecentPromoCard } from '../../styles/Card';
import { connect } from 'react-redux';

import Promo from '../../handle/promos/Promo';

const Recent = ({ userID, handle }) => {
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
		if (response.status < 400) {
			return updateState({
				promo: response.payload,
				loading: false
			});
		}

		updateState({ loading: false });
	};

	const renderPromo = () => {
		if (promo && !loading) {
			return <Promo {...promo} />;
		}

		return null;
	};

	return (
		<HandleRecentPromoCard>
			<StyledHeading>Most recent from {handle}</StyledHeading>
			{renderPromo()}
		</HandleRecentPromoCard>
	);
};

const mapStateToProps = ({ profile: { viewing: { userID, handle } } }) => {
	return { userID, handle };
};

export default connect(mapStateToProps, null)(Recent);

const StyledHeading = styled.h5`
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 2px;
	margin-bottom: 5rem;
	font-size: 1.5rem;
	color: #253858;
`;
