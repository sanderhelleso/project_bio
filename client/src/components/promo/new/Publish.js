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

		return this.props.promo;
	}

	createPromo = async () => {
		// create promo
		const promo = this.normalizePromo();
		const response = await createPromo(promo);

		// upload products releated image
		if (response.status < 400) {
			promo.products.forEach((product, i) => {
				this.uploadPromoProductImg(product.image, response.payload[i]);
			});
		}
	};

	uploadPromoProductImg = async (blob, id) => {
		// create combined formdata
		const data = new FormData();
		data.append('image', blob.get('promo'), 'product.jpg');
		data.append('id', id);

		// upload images for promo products
		const response = await uploadPromo(data);
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
