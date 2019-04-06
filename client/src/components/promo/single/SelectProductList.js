import React from 'react';
import styled from 'styled-components';
import SelectProductOption from './SelectProductOption';
import SelectProductPlaceholder from './SelectProductPlaceholder';

const SelectProductList = ({ products }) => {
	const renderProducts = () => {
		for (let i = 0; i < 3 - products.length + i; i++) products.push(-1);
		return products;
	};

	return (
		<StyledList>
			{renderProducts().map((product) => {
				if (product === -1) return <SelectProductPlaceholder />;

				return <SelectProductOption key={product} active={products[0] === product} product={product} />;
			})}
		</StyledList>
	);
};

export default SelectProductList;

const StyledList = styled.ul`
	padding: 2rem 1rem;
	min-width: 100%;
	align-self: center;
	justify-self: center;
`;
