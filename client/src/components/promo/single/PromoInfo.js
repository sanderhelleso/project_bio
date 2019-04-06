import React from 'react';
import styled from 'styled-components';
import PromoCode from './PromoCode';
import PromoLink from './PromoLink';

const PromoInfo = ({ title, description, promotion_code, link }) => {
	return (
		<StyledInfoCont>
			<h2>{title}</h2>
			<p>{description}</p>
			<PromoCode code={promotion_code} />
			<PromoLink link={link} />
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

	border-right: 1px solid #eeeeee;
`;
