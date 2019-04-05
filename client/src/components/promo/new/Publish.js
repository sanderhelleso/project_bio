import React, { Component } from 'react';
import { Button } from '../../styles/Button';
import FeaterIcons from 'feather-icons-react';
import { createPromo, uploadPromo } from '../../../api/promo/promo';
import createPromoAction from '../../../actions/promoActions/createPromoAction';

import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Publish extends Component {
	state = { loading: false };

	normalizePromo() {
		// normalizes the promo before sending
		this.props.promo.products = this.props.promo.products.map((p) => {
			return {
				...p,
				price: Math.round(p.price * 100) / 100
			};
		});

		return this.props.promo;
	}

	createPromo = async () => {
		// create promo
		const promo = this.normalizePromo();
		const response = await createPromo(promo);

		// if success, upload promo products releated image
		if (response.status < 400) {
			// resolve once all images has been saved
			await Promise.all(
				promo.products.map(async (product, i) => {
					promo.products[i].image = await this.uploadPromoProductImg(
						product.image,
						response.payload.promoProductIDs[i]
					);
				})
			);
		}

		// add new promo to users promo list, and active promo
		const id = response.payload.promoID;
		this.props.createPromoAction({
			[id]: promo
		});

		// redirect to promotion and render active promo
		this.props.history.push(`/${this.props.handle}/promotions/${id}`);
	};

	uploadPromoProductImg = async (blob, id) => {
		// create combined formdata
		const data = new FormData();
		data.append('image', blob.get('promo'), 'product.jpg');
		data.append('id', id);

		// upload images for promo products
		const response = await uploadPromo(data);
		if (response.status < 400) {
			return response.payload.image;
		}

		return '';
	};

	render() {
		return (
			<Button disabled={this.props.disabled || this.state.loading} onClick={this.createPromo}>
				<FeaterIcons icon="check" />
				Publish
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return { handle: state.profile.handle };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ createPromoAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Publish));
