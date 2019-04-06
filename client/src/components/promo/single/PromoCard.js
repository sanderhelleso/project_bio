import React from 'react';
import { PromoCardSingle } from '../../styles/Card';
import PromoImg from './PromoImg';
import PromoInfo from './PromoInfo';
import SelectProductList from './SelectProductList';

const PromoCard = ({ promo, products }) => (
	<PromoCardSingle>
		<PromoImg />
		<PromoInfo {...promo} />
		<SelectProductList products={products} />
	</PromoCardSingle>
);

export default PromoCard;
