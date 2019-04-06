import React from 'react';
import styled from 'styled-components';
import PromoCode from './PromoCode';
import PromoLink from './PromoLink';
import PromoOwner from './PromoOwner';
import PromoPrice from './PromoPrice';
import ProductNameBrand from './ProductNameBrand';

const PromoInfo = ({ title, description, promotion_code, CreatedAt, profile, active }) => {
	return (
		<StyledInfoCont>
			<StyledInfoHeader>
				<h2>{title}</h2>
				<PromoOwner {...profile} postedAt={CreatedAt} />
				<p>{description}</p>
			</StyledInfoHeader>
			<StyledInfoBody>
				<ProductNameBrand name={active.name} brand={active.brand} />
				<PromoPrice price={active.price} currency={active.currency} />
			</StyledInfoBody>
			<StyledActionCont>
				<p>Use the code below to get {20}% of this product</p>
				<PromoCode code={promotion_code} />
				<PromoLink link={active.link} />
			</StyledActionCont>
		</StyledInfoCont>
	);
};

export default PromoInfo;

const StyledInfoCont = styled.div`
	overflow: hidden;
	grid-area: info;

	h2 {
		margin-top: 0;
		font-size: 1.75rem;
		word-break: break-all;
	}

	p {
		font-size: 0.8rem;
		color: #252525;
	}

	border-right: 1px solid #eeeeee;

	@media screen and (max-width: 1100px) {
		border-right: none;
	}

	@media screen and (max-width: 600px) {
		border-right: none;
		padding: 2rem;
	}
`;

const StyledInfoHeader = styled.div`
	margin-bottom: 2rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid #eeeeee;
`;

const StyledInfoBody = styled.div`
	display: grid;
	grid-template-columns: 70% 30%;

	/* prettier-ignore */
	grid-template-areas: 
		"header price"
	;
	margin-bottom: 1.5rem;

	@media screen and (max-width: 600px) {
		/* prettier-ignore */
		grid-template-areas: 
			"header header"
			"price price"
		;
	}
`;

const StyledActionCont = styled.div`
	min-width: 100%;

	p {
		margin-bottom: 1.5rem;
		margin-top: 0;
		font-size: 0.9rem;
	}
`;
