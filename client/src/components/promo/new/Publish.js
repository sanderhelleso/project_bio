import React, { Component } from 'react';
import { Button } from '../../styles/Button';
import FeaterIcons from 'feather-icons-react';
import { createPromo } from '../../../api/promo/promo';

class Publish extends Component {
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
		const response = await createPromo(this.normalizePromo());
		console.log(response);
	};

	render() {
		return (
			<Button disabled={this.props.disabled} onClick={this.createPromo}>
				<FeaterIcons icon="check" />
				Publish
			</Button>
		);
	}
}

export default Publish;
