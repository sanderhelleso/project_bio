import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Container from '../../styles/Container';
import { Grid } from '../../styles/Grid';
import Form from './ProductForm';
import PreviewList from './PreviewList';
import PromoForm from './PromoForm';
import DetailsOverview from './DetailsOverview';

class NewPromo extends Component {
	state = {
		stage: 'promo',
		promo: {
			title: '',
			description: '',
			category: '',
			expires: '',
			code: '',
			discount: '',
			products: []
		},
		...this.resetCurrProd()
	};

	resetCurrProd() {
		return {
			currentProduct: null,
			currProdMalloc: null
		};
	}

	backToPromo = () => this.setState({ stage: 'promo' });

	updatePromo = (promo) => {
		this.setState({
			promo,
			stage: 'products'
		});
	};

	updateProducts = (product) => {
		this.setState({
			...this.resetCurrProd(),
			promo: {
				...this.state.promo,
				products: this.productIncluded(this.state.currProdMalloc)
					? this.updateProduct(product)
					: [ ...this.state.promo.products, product ]
			}
		});
	};

	updateProduct = (product) => {
		const prod = this.state.promo.products;
		prod[prod.indexOf(this.state.currProdMalloc)] = product;
		return [ ...prod ];
	};

	removeProduct = () => {
		this.setState({
			...this.resetCurrProd(),
			promo: {
				...this.state.promo,
				products: this.state.promo.products.filter((p) => p !== this.state.currProdMalloc)
			}
		});
	};

	selectProduct = (product) => {
		if (this.productIncluded(product)) {
			this.setState({
				currentProduct: product,
				currProdMalloc: product
			});
		}
	};

	productIncluded(product) {
		return this.state.promo.products.includes(product);
	}

	renderStage() {
		if (this.state.stage === 'promo') {
			return <PromoForm updatePromo={this.updatePromo} promo={this.state.promo} />;
		} else if (this.state.stage === 'products') {
			return (
				<Fragment>
					<DetailsOverview
						backToPromo={this.backToPromo}
						promo={this.state.promo}
						valid={this.state.promo.products.length > 0}
					/>
					<div>
						<Form
							updateProducts={this.updateProducts}
							removeProduct={this.removeProduct}
							currentProduct={this.state.currentProduct}
							canAddMore={this.state.promo.products.length < 3}
						/>
						<PreviewList list={this.state.promo.products} selectProduct={this.selectProduct} />
					</div>
				</Fragment>
			);
		}

		return null;
	}

	render() {
		return (
			<StyledNewPromo>
				<Container id="cont">{this.renderStage()}</Container>
			</StyledNewPromo>
		);
	}
}

export default NewPromo;

const StyledNewPromo = styled.div`
	margin: 5rem auto;

	#cont {
		min-width: 85%;

		button {
			float: right;
			margin-top: 2rem;
			margin-left: 2rem;
			min-width: 150px;
		}

		@media screen and (max-width: 600px) {
			min-width: 100%;

			button {
				float: none;
				min-width: 100% !important;
				margin: 2rem auto;
			}
		}
	}

	@media screen and (max-width: 600px) {
		margin-bottom: 3rem;
	}
`;
