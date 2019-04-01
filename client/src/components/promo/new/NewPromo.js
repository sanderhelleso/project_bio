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
            expires_at: '',
            category: ''
        },
        products: [],
        ...this.resetCurrProd()
    }

    resetCurrProd() {
        return {
            currentProduct: null,
            currProdMalloc: null
        }
    }

    backToPromo = () => this.setState({ stage: 'promo' });

    updatePromo = promo => {
        this.setState({
            promo,
            stage: 'products'
        });
    }

    updateProducts = product => {
        this.setState({ 
            ...this.resetCurrProd(),
            products: this.productIncluded(this.state.currProdMalloc) 
            ? this.updateProduct(product)
            : [...this.state.products, product]
        });
    }

    updateProduct = product => {
        const prod = this.state.products;
        prod[prod.indexOf(this.state.currProdMalloc)] = product;
        return [...prod]
    }

    removeProduct = () => {
        this.setState({ 
            ...this.resetCurrProd(),
            products: this.state.products
            .filter(p => p !== this.state.currProdMalloc)
        });
    }

    selectProduct = product => {
        if (this.productIncluded(product)) {
            this.setState({ 
                currentProduct: product,
                currProdMalloc: product 
            });
        }
    }

    productIncluded(product) {
        return this.state.products.includes(product);
    }

    renderStage() {
        if (this.state.stage === 'promo') {
            return (
                <PromoForm 
                    updatePromo={this.updatePromo}
                    promo={this.state.promo}
                />
            )
        }

        else if (this.state.stage === 'products') {
            return (
                <Fragment>
                    <DetailsOverview 
                        backToPromo={this.backToPromo}
                        promo={this.state.promo}
                        valid={this.state.products.length > 0} 
                    />
                    <Grid>
                        <Form 
                            updateProducts={this.updateProducts}
                            removeProduct={this.removeProduct}
                            currentProduct={this.state.currentProduct} 
                        />
                        <PreviewList 
                            list={this.state.products} 
                            selectProduct={this.selectProduct}
                        />
                    </Grid>
                </Fragment>
            );
        }

        return null;
    }
    
    render() {
        return (
            <StyledNewPromo>
                <Container id="cont">
                    {this.renderStage()}
                </Container>
            </StyledNewPromo>
        )
    }
}

export default NewPromo;

const StyledNewPromo = styled.div`
    margin: 3.5rem auto 12.5rem auto;

    #cont {
        min-width: 85%;
        input {
            min-height: 2.65rem;
            max-height: 2.65rem;
            padding: 26.5px 8px;
        }

        label {
            margin-top: 1.35rem;
        }

        button {
            float: right;
            margin-top: 2rem;
            margin-left: 2rem;
            min-width: 150px;
        }
    }

`;