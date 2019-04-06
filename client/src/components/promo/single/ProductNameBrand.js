import React from 'react';
import styled from 'styled-components';

const ProductNameBrand = ({ name, brand }) => (
	<StyledNameBrandCont>
		<h5>{name}</h5>
		<span>By {brand}</span>
	</StyledNameBrandCont>
);

export default ProductNameBrand;

const StyledNameBrandCont = styled.div`
	h5 {
		margin: 0;
		font-size: 1.5rem;
		margin-top: 0.35rem;
	}

	span {
		font-size: 0.9rem;
		color: #9e9e9e;
	}
`;
