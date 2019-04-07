import React from 'react';
import styled from 'styled-components';
import PromoCode from './PromoCode';
import PromoLink from './PromoLink';
import PromoOwner from './PromoOwner';
import PromoPrice from './PromoPrice';
import ProductNameBrand from './ProductNameBrand';

import { bindActionCreators } from 'react';
import { connect } from 'react-redux';

const PromoInfo = ({
	promo: { title, description, promotion_code, CreatedAt },
	active: { name, brand, price, currency, link }
}) => {
	return (
		<StyledInfoCont>
			<StyledInfoHeader>
				<h2>{title}</h2>
				<PromoOwner postedAt={CreatedAt} />
				<p>{description}</p>
			</StyledInfoHeader>
			<StyledInfoBody>
				<ProductNameBrand name={name} brand={brand} />
				<PromoPrice price={price} currency={currency} />
			</StyledInfoBody>
			<StyledActionCont>
				<p>Use the code below to get {20}% of this product</p>
				<PromoCode code={promotion_code} />
				<PromoLink link={link} />
			</StyledActionCont>
		</StyledInfoCont>
	);
};

const mapStateToProps = ({ promos: { viewing: { promo } } }) => {
	return { promo };
};

export default connect(mapStateToProps, null)(PromoInfo);

const StyledInfoCont = styled.div`
	overflow: hidden;
	grid-area: info;
	padding: 2rem 2.5rem;

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
		padding: 1rem;
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
		margin-bottom: 0.5rem;
		margin-top: 0;
		font-size: 0.9rem;
	}
`;
