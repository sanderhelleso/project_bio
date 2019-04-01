import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { Inputs, Input, Label } from '../../styles/Input';
import Price from './Price';
import { Button, FlatButton } from '../../styles/Button';
import UploadPromoImage from './UploadPromoImage';
import blobToSrc from '../../../lib/blobToSrc';
import { withToastManager } from 'react-toast-notifications';
import { alertFormError } from '../../../lib/alert';

import { validateFormByObj } from '../../../validators/validate';
import productErrHandler from '../../../validators/product';

class Form extends Component {
    state = {
        loading: false,
        product: this.props.currentProduct || this.resetProduct(),
        fields: [
            {
                placeholder: 'Name of the product',
                max: 70,
                min: 1,
                name: 'name',
                type: 'text',
                required: true,
                error: false
            },
            {
                placeholder: 'Brand of product',
                max: 70,
                min: 1,
                name: 'brand',
                type: 'text',
                required: true,
                error: false,
            },
            {
                placeholder: 'Link to product',
                name: 'link',
                type: 'text',
                error: false,
            },
        ]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentProduct) {
            this.setState({ product: nextProps.currentProduct });
        }
    }

    componentDidMount = () => window.scrollTo(0, 0);

    resetProduct() {
        return {
            name: '',
            brand: '',
            link: '',
            price: '',
            currency: '',
            image: null
        }
    }

    handleChange = e => {
        this.setState({ 
            product: {
                ...this.state.product,
                [e.target.name]: e.target.value 
            }
        });
    }

    handleFile = image => {
        this.setState({ 
            product: {
                ...this.state.product,
                image
            }
        });
    }

    selectProduct = product => {
        this.props.selectProduct(product);
    }

    addProduct() {


        const valid = validateFormByObj(this.state.product, productErrHandler);

        // if errors, notify user
        if (typeof valid === 'object') {
            return valid.forEach(err => alertFormError(this.props, err));
        }

        // add product to list of previews and clear form
        this.props.updateProducts(this.state.product)
        this.setState({ product: this.resetProduct() })
    }

    removeProduct() {

        // remove product from list of previews and clear form
        this.props.removeProduct()
        this.setState({ product: this.resetProduct() })
    }

    renderFields() {
        return this.state.fields.map(field => {
            return (
                <Fragment key={field.name}>
                    <Label 
                        htmlFor={field.name} 
                        text={field.name} 
                    />
                    <Input 
                        {...field} 
                        value={this.state.product[field.name] || ''}
                        onChange={e => this.handleChange(e)}
                    />
                </Fragment>
            )
        })
    }

    renderButtons() {

        const addBtn = (
            <Button 
                size="small"
                disabled={!this.props.canAddMore && !this.props.currentProduct}
                onClick={() => this.addProduct()}
            >
                {this.props.currentProduct ? 'Update' : 'Add'} Product
            </Button>
        );

        const removeBtn = this.props.currentProduct ? (
            <FlatButton 
                size="small"
                onClick={() => this.removeProduct()}
            >
                Remove
            </FlatButton>
        ) : null;

        return (
            <Fragment>
                {addBtn}
                {removeBtn}
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <UploadPromoImage 
                    handleFile={this.handleFile} 
                    reset={!this.state.product.image}
                    source={this.props.currentProduct
                        ? blobToSrc(this.state.product.image.get('promo')) || 
                          blobToSrc(this.props.currentProduct.image.get('promo'))
                        : null
                    } 
                />
                <StyledForm>
                    <Inputs stretch={true} stack={true}>
                        {this.renderFields()}
                    </Inputs>
                    <Price 
                        onChange={this.handleChange}
                        price={this.state.product.price}
                        currency={this.state.product.currency}
                    />
                    {this.renderButtons()}
                </StyledForm>
            </Fragment>
        )
    }
}

export default withToastManager(Form);

const StyledForm = styled.div`
    margin-top: -1rem;
`;
