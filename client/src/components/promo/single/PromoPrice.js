import React from 'react';
import styled from 'styled-components';

const PromoPrice = ({ price, currency, discount_amount }) => {
	const renderPriceBefore = () => {
		if (discount_amount === 0) return null;

		return <StyledPriceBefore>{price.toFixed(2)}</StyledPriceBefore>;
	};

	const renderPriceAfter = () => {
		if (discount_amount > 0) {
			const amountDiscounted = 20 / 100 * price;
			const discountedPrice = (price - amountDiscounted).toFixed(2);
			return discountedPrice;
		}

		return price.toFixed(2);
	};

	return (
		<StyledPriceCont>
			{renderPriceBefore()}
			<StyledPriceAfter>
				{renderPriceAfter()} {currency}
			</StyledPriceAfter>
		</StyledPriceCont>
	);
};

export default PromoPrice;

const StyledPriceCont = styled.div`
	grid-area: price;

	h4,
	h5 {
		float: right;
		clear: both;
		word-wrap: break-word;
	}

	@media screen and (max-width: 600px) {
		margin-top: 1rem;

		h4,
		h5 {
			float: left;
		}
	}
`;

const StyledPriceBefore = styled.h5`
	text-decoration: line-through;
	font-size: 1.15rem;
	margin: 0;
	color: #9e9e9e;
	font-weight: 100;
`;

const StyledPriceAfter = styled.h4`
	font-size: 1.5rem;
	margin: 0;
	font-weight: 100;
`;
