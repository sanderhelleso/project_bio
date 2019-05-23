import React from 'react';
import styled from 'styled-components';

import { HandlePromoCard } from '../../styles/Card';
import PromoImages from './PromoImages';
import PromoInfo from './PromoInfo';

const Promo = ({ promo }) => {
	const setImgs = () => {
		return new Array(Math.floor(Math.random() * 3) + 1).fill(0);
	};

	return (
		<HandlePromoCard>
			<PromoImages images={setImgs()} />
			<PromoInfo {...promo} />
		</HandlePromoCard>
	);
};

export default Promo;
