import React, { Component } from 'react';
import { getPromo } from '../../../api/promo/promo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import viewPromoAction from '../../../actions/promoActions/viewPromoAction';
import Container from '../../styles/Container';
import PromoCard from './PromoCard';

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

		return <PromoCard promo={this.state.promo} products={this.state.products} />;
	}

	render() {
		return <Container>{this.renderPromo()}</Container>;
	}
}

const mapStateToProps = (state) => {
	return { viewing: state.promos.viewing };
};

const mapDispatchToProps = (dispatch) => {
	return { viewPromoAction }, dispatch;
};

export default connect(mapStateToProps, null)(Single);
