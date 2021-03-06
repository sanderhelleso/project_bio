import React from 'react';
import styled from 'styled-components';
import SelectProductOption from './SelectProductOption';
import SelectProductPlaceholder from './SelectProductPlaceholder';

const SelectProductList = ({ products, active, updateState }) => {
	const renderProducts = () => {
		for (let i = 0; i < 3 - products.length + i; i++) products.push(-1);
		return products;
	};

	return (
		<StyledList>
			{renderProducts().map((product, id) => {
				if (product === -1) return <SelectProductPlaceholder key={id * 2} />;

				return (
					<li
						key={id}
						onClick={() =>
							updateState({
								active: {
									id,
									...product
								}
							})}
					>
						<SelectProductOption active={id === active.id} product={product} />
					</li>
				);
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
	grid-area: options;

	li {
		margin: 2rem auto;
	}

	@media screen and (max-width: 600px) {
		display: flex;
		justify-content: space-between;
		max-width: 100%;
		padding: 1rem;

		li {
			margin: 0 auto;
		}
	}
`;
