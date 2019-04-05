import React, { Component } from 'react';
import { Button } from '../../styles/Button';
import FeaterIcons from 'feather-icons-react';
import { createPromo, uploadPromo } from '../../../api/promo/promo';

class Publish extends Component {
	normalizePromo() {
		// normalizes the promo before sending
		this.props.promo.products = this.props.promo.products.map((p) => {
			return {
				...p,
				price: Math.round(p.price * 100) / 100
			};
		});
	}

	createPromo = async () => {
		// create promo
		const response = await createPromo(this.props.promo);

		if (response.status < 400) {
			this.props.promo.products.forEach((product, i) => {
				this.uploadPromoProductImg(product.image, response.payload[i]);
			});
		}
	};

	uploadPromoProductImg = async (blob, id) => {
		const fd = new FormData();
		fd.append(blob, id);

		// upload images for promo products
		const response = await uploadPromo(fd);
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
