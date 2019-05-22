import React from 'react';
import styled from 'styled-components';

import { HandlePromoCard } from '../../styles/Card';

const Promo = ({ title }) => {
	return (
		<HandlePromoCard>
			<h5>{title}</h5>
		</HandlePromoCard>
	);
};

export default Promo;
