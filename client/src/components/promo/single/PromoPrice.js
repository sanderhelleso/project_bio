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
		<p>
			{renderPriceBefore()}
			<StyledPriceAfter>
				{renderPriceAfter()} {currency}
			</StyledPriceAfter>
		</p>
	);
};

export default PromoPrice;

const StyledPriceBefore = styled.h5`
	text-decoration: line-through;
	font-size: 1.15rem;
	margin: 0;
	color: #9e9e9e;
	font-weight: 100;
	text-align: right;
`;

const StyledPriceAfter = styled.h4`
	font-size: 1.5rem;
	margin: 0;
	font-weight: 100;
	text-align: right;
`;
