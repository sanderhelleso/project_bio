import React, { Component } from 'react';
import styled from 'styled-components';

import Preview from './Preview';
import NoProductsPlaceholder from './NoProductsPlaceholder';
import PreviewPlaceholder from './PreviewPlaceholder';

class PreviewList extends Component {
	maxProducts = 3;

	selectProduct = (product) => {
		this.props.selectProduct(product);
	};

	renderList() {
		const list = this.props.list.map((product) => {
			return (
				<li key={product.name} onClick={() => this.selectProduct(product)}>
					<Preview {...product} />
				</li>
			);
		});

		for (let i = 0; i < this.maxProducts - this.props.list.length; i++) {
			list.push(
				<li key={i}>
					<PreviewPlaceholder />
				</li>
			);
		}

		return list;
	}

	render() {
		return (
			<StyledPreview>
				<StyledInfo>
					{this.props.list.length}/{this.maxProducts} products added
				</StyledInfo>
				<ul>{this.renderList()}</ul>
			</StyledPreview>
		);
	}
}

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
