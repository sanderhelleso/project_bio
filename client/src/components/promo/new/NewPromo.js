import React, { Component } from 'react';
import styled from 'styled-components';

import Container from '../../styles/Container';
import { Grid } from '../../styles/Grid';
import Form from './ProductForm';
import PreviewList from './PreviewList';
import PromoForm from './PromoForm';

class NewPromo extends Component {
    state = {
        promo: {
            active: true,
            valid: false,
            title: '',
            description: '',
            expiresAt: ''
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
            products: this.state.products.filter(p => p !== this.state.currProdMalloc)
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
        if (this.state.promo.active) {
            return <PromoForm promo={this.state.promo}/>
        }

        return (
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
        )
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
    margin: 15vh auto;

    #cont {
        min-width: 85%;
        input {
            max-height: 2.65rem;
        }

        label {
            margin-top: 1.35rem;
        }
    }

`;