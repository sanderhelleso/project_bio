import React from 'react';
import styled from 'styled-components';
import SelectProductOption from './SelectProductOption';

const SelectProductList = ({ products }) => (
	<StyledList>
		{[ 1, 2, 3 ].map((product) => {
			return <SelectProductOption key={product} />;
		})}
	</StyledList>
);

export default SelectProductList;

const StyledList = styled.ul`
	padding: 2rem 1rem;
	min-width: 100%;
	align-self: center;
	justify-self: center;
`;
