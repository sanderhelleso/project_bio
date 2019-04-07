import React, { Component } from 'react';
import styled from 'styled-components';
import { getPromo } from '../../../api/promo/promo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import viewPromoAction from '../../../actions/promoActions/viewPromoAction';
import Container from '../../styles/Container';
import PromoCard from './PromoCard';
import Comments from '../comments/Comments';
import { AddsCard } from '../../styles/Card';

class Single extends Component {
	state = {
		loading: true,
		error: false
	};

	async componentDidMount() {
		// TODO: check if same promo is already loaded

		// attempt to load promo by the given handler and param ID
		const { handle, id } = this.props.match.params;
		const response = await getPromo(handle, id);
		console.log(response);
		if (response.status > 400) {
			return this.setState({
				error: response.message,
				loading: false
			});
		}

		this.setState({
			promo: response.payload.promo,
			products: response.payload.products,
			profile: response.payload.profile,
			loading: false
		});
	}

	renderPromo() {
		if (!this.state.loading && this.state.error) {
			return <p>{this.state.error}</p>;
		}

		if (this.state.loading) {
			return <p>Loading...</p>;
		}

		return (
			<StyledPromoGrid>
				<PromoCard {...this.state} />
				<Comments promoOwner={this.state.profile.handle} />
				<AddsCard />
			</StyledPromoGrid>
		);
	}

	render() {
		return <Container max={85}>{this.renderPromo()}</Container>;
	}
}

const mapStateToProps = (state) => {
	return { viewing: state.promos.viewing };
};

const mapDispatchToProps = (dispatch) => {
	return { viewPromoAction }, dispatch;
};

export default connect(mapStateToProps, null)(Single);

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
