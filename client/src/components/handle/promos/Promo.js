import React from 'react';
import styled from 'styled-components';

import { HandlePromoCard } from '../../styles/Card';
import PromoImages from './PromoImages';
import PromoInfo from './PromoInfo';

const Promo = ({ promo }) => {
	return (
		<HandlePromoCard>
			<PromoImages images={[ 1, 2, 3 ]} />
			<PromoInfo {...promo} />
		</HandlePromoCard>
	);
};

export default Promo;
