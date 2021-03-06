import React, { useEffect, useReducer, Fragment } from 'react';
import styled from 'styled-components';
import { getPromo } from '../../../api/promo/promo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import viewPromoAction from '../../../actions/promoActions/viewPromoAction';
import addToHistoryAction from '../../../actions/promoHistoryActions/addToHistoryAction';

import { mainGridStyles } from '../../styles/Card';
import Container from '../../styles/Container';
import PromoCard from './PromoCard';
import Comments from '../comments/Comments';
import PreviewsCard from '../preview/PreviewsCard';
import PromoLoader from './PromoLoader';
import CommentsLoader from '../comments/CommentsLoader';
import PreviewLoader from '../preview/PreviewLoader';

import { withRouter } from 'react-router-dom';

const Single = ({ viewPromoAction, addToHistoryAction, match: { params }, history, location }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		error: false
	});

	const { loading, error } = state;

	const back = () => {
		window.onpopstate = () => history.go(1);
	};

	useEffect(() => {
		// TODO: check if same promo is already loaded
		async function loadPromo() {
			window.scrollTo(0, 0);

			// attempt to load promo by the given handler and param ID
			const { handle, id } = params;
			const response = await getPromo(handle, id);
			console.log(response);

			// successfully found promotion
			if (response.status > 400) {
				return updateState({
					error: response.message,
					loading: false
				});
			}

			// set current viewing promo
			viewPromoAction(response.payload);

			// add promo to history queue
			addToHistoryAction(response.payload.promo);

			updateState({ loading: false });
		}

		loadPromo();
		window.onpopstate = back;
	}, []);

	const renderPromo = () => {
		if (!loading && error) {
			return <p>{error}</p>;
		}

		if (loading) {
			return (
				<Fragment>
					<PromoLoader />
					<CommentsLoader />
					<PreviewLoader />
				</Fragment>
			);
		}

		return (
			<Fragment>
				<PromoCard />
				<Comments />
				<PreviewsCard />
			</Fragment>
		);
	};

	return (
		<Container max={85}>
			<StyledPromoGrid>{renderPromo()}</StyledPromoGrid>
		</Container>
	);
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ viewPromoAction, addToHistoryAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(Single));

const StyledPromoGrid = styled.div`
	${mainGridStyles};
	grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);

	/* prettier-ignore */
	grid-template-areas:
		"promo promo"
		"comments adds"
	;

	@media screen and (max-width: 1000px) {
		grid-template-columns: minmax(0, 1fr);

		/* prettier-ignore */
		grid-template-areas:
			"promo promo"
			"comments comments"
			"adds adds"
		;
	}
`;
