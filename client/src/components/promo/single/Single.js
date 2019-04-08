import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { getPromo } from '../../../api/promo/promo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import viewPromoAction from '../../../actions/promoActions/viewPromoAction';
import Container from '../../styles/Container';
import PromoCard from './PromoCard';
import Comments from '../comments/Comments';
import PreviewsCard from '../preview/PreviewsCard';

const data = [
	{
		id: 1,
		profile: {
			handle: 'sanderhelleso',
			avatar: '',
			postedAt: new Date()
		},
		reply: false,
		comment:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
	},
	{
		id: 2,
		profile: {
			handle: 'janteigen',
			avatar: '',
			postedAt: new Date()
		},
		reply: {
			profile: {
				handle: 'sanderhelleso',
				avatar: '',
				postedAt: new Date()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		comment:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
	},
	{
		id: 3,
		profile: {
			handle: 'rudycruz',
			avatar: '',
			postedAt: new Date()
		},
		reply: false,
		comment:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
	}
];

const Single = ({ viewPromoAction, match: { params } }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		error: false
	});

	const { loading, error } = state;

	useEffect(() => {
		// TODO: check if same promo is already loaded
		async function loadPromo() {
			// attempt to load promo by the given handler and param ID
			const { handle, id } = params;
			const response = await getPromo(handle, id);
			console.log(response);
			if (response.status > 400) {
				return updateState({
					error: response.message,
					loading: false
				});
			}

			viewPromoAction({
				...response.payload,
				comments: data
			});

			updateState({ loading: false });
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
				<PromoCard />
				<Comments />
				<PreviewsCard />
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

	@media screen and (max-width: 1000px) {
		display: block;
	}
`;
