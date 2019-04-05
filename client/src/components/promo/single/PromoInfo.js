import React from 'react';
import styled from 'styled-components';
import PromoCode from './PromoCode';
import PromoLink from './PromoLink';

const PromoInfo = ({ promo }) => {
	return (
		<StyledInfoCont>
			<h2>{promo.title}</h2>
			<p>{promo.description}</p>
			<PromoCode code={promo.promotion_code} />
			<PromoLink link={promo.link} />
		</StyledInfoCont>
	);
};

export default PromoInfo;

const StyledInfoCont = styled.div`
	padding: 2rem;

	p {
		font-size: 0.8rem;
		color: #252525;
	}
`;
