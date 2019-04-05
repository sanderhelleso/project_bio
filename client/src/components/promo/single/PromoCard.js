import React from 'react';
import { PromoCardSingle } from '../../styles/Card';
import PromoImg from './PromoImg';
import PromoInfo from './PromoInfo';

const PromoCard = (promo) => (
	<PromoCardSingle>
		<PromoImg />
		<PromoInfo {...promo} />
	</PromoCardSingle>
);

export default PromoCard;
