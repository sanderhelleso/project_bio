import React from 'react';
import styled from 'styled-components';

import { HandlePromoCard } from '../../styles/Card';
import PromoImages from './PromoImages';
import PromoInfo from './PromoInfo';

const Promo = ({ title, description, discount, createdAt, promoID, previews }) => {
	const formatImages = () => {
		return previews.map((preview) => preview.image);
	};

	return (
		<HandlePromoCard>
			<PromoImages images={formatImages()} />
			<PromoInfo {...{ title, description, discount, createdAt, promoID }} />
		</HandlePromoCard>
	);
};

export default Promo;
