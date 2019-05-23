import React, { useEffect, useReducer, Fragment } from 'react';
import styled from 'styled-components';

import { HandleSeeMorePromosCard } from '../../styles/Card';
import Promo from './Promo';

import { getPromos } from '../../../api/promo/promo';
import { connect } from 'react-redux';

const Promos = ({ userID, handle }) => {
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
		const response = await getPromos(userID, offset, limit);
		if (response.status < 400) {
			return updateState({
				loading: false,
				promos: response.payload,
				offset: offset + limit
			});
		}

		updateState({ loading: false });
	};

	const renderPromos = () => {
		return promos.map((promo) => <Promo key={promo.ID} promo={promo} />);
	};

	const render = () => {
		if (loading) return <p>Loading...</p>;

		if (promos.length) {
			return (
				<Fragment>
					<StyledHeading>More from {handle}</StyledHeading>
					<StyledPromosCont>{renderPromos()}</StyledPromosCont>
				</Fragment>
			);
		}
	};

	return <StyledCont>{render()}</StyledCont>;
};

const mapStateToProps = ({ profile: { viewing: { userID, handle } } }) => {
	return { userID, handle };
};

export default connect(mapStateToProps, null)(Promos);

const StyledCont = styled.div`grid-area: seeMorePromos;`;

const StyledPromosCont = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	grid-row-gap: 4rem;
	grid-column-gap: 3rem;

	@media screen and (max-width: 1000px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media screen and (max-width: 600px) {
		grid-template-columns: minmax(0, 1fr);
	}
`;

const StyledHeading = styled.h5`
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 2px;
	margin-bottom: 5rem;
	font-size: 1.5rem;
	color: #253858;
`;
