import React, { Component } from 'react';
import styled from 'styled-components';

import Preview from './Preview';
import PreviewPlaceholder from './PreviewPlaceholder';

const PreviewList = ({ selectProduct, list }) => {
	const MAX_PRODUCTS = 3;

	const renderList = () => {
		const productList = list.map((product) => {
			return (
				<li key={product.name} onClick={() => selectProduct(product)}>
					<Preview {...product} />
				</li>
			);
		});

		for (let i = 0; i < MAX_PRODUCTS - list.length; i++) {
			productList.push(
				<li key={i}>
					<PreviewPlaceholder />
				</li>
			);
		}

		return productList;
	};

	return (
		<StyledPreview>
			<StyledInfo>
				{list.length}/{MAX_PRODUCTS} products added
			</StyledInfo>
			<ul>{renderList()}</ul>
		</StyledPreview>
	);
};

export default PreviewList;

const StyledInfo = styled.h3`
	text-align: center;
	margin-bottom: 3.5rem;
	margin-top: 0;
`;

const StyledPreview = styled.div`
	max-width: 275px;
	min-width: 275px;
	margin: 0 auto;
	grid-area: list;

	ul {
		padding: 0;

		li {
			list-style: none;
			margin-bottom: 2.5rem;
		}
	}

	@media screen and (max-width: 800px) {
		min-width: 350px;
		max-width: 350px;
	}

	@media screen and (max-width: 400px) {
		min-width: 100%;
		max-width: 100%;
	}
`;
