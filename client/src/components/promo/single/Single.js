import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { getPromo } from '../../../api/promo/promo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import viewPromoAction from '../../../actions/promoActions/viewPromoAction';
import Container from '../../styles/Container';
import PromoCard from './PromoCard';
import Comments from '../comments/Comments';
import { AddsCard } from '../../styles/Card';

const Single = ({ viewPromoAction, match: { params }, viewing }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		error: false
	});

	const { loading, error } = state;

	useEffect(() => {
		const { handle, id } = params;
		if (viewing.promo.ID === id) {
			return updateState({ loading: false });
		}

		async function loadPromo() {
			const response = await getPromo(handle, id);
			if (response.status > 400) {
				return updateState({
					error: response.message,
					loading: false
				});
			}

			updateState({ loading: false });
			viewPromoAction({
				...response.payload,
				comments: []
			});
		}
		loadPromo();
	}, []);

	const renderPromo = () => {
		if (!loading && error) {
			return <p>{error}</p>;
		}

		if (loading) {
			return <p>Loading...</p>;
		}

		return (
			<StyledPromoGrid>
				<PromoCard {...viewing} />
				<Comments promoOwner={viewing.profile.handle} />
				<AddsCard />
			</StyledPromoGrid>
		);
	};

	return <Container max={85}>{renderPromo()}</Container>;
};

const mapStateToProps = ({ promos: { viewing } }) => {
	return { viewing };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ viewPromoAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Single);

const StyledPromoGrid = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	grid-column-gap: 3rem;

	/* prettier-ignore */
	grid-template-areas:
		"promo promo"
		"comments adds"
	;

	@media screen and (max-width: 800px) {
		display: block;
	}
`;
