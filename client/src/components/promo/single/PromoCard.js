import React from 'react';
import { PromoCardSingle } from '../../styles/Card';
import PromoImg from './PromoImg';
import PromoInfo from './PromoInfo';
import SelectProductList from './SelectProductList';

const PromoCard = ({ promo }) => (
	<PromoCardSingle>
		<PromoImg />
		<PromoInfo {...promo} />
		<SelectProductList products={[ 1, 2, 3 ]} />
	</PromoCardSingle>
);

export default PromoCard;
