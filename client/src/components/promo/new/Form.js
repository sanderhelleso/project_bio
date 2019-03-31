import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


import SelectCategory from './SelectCategory';
import { Inputs, Input, Label } from '../../styles/Input';
import Price from './Price';
import { Button, FlatButton } from '../../styles/Button';
import UploadPromoImage from './UploadPromoImage';
import blobToSrc from '../../../lib/blobToSrc';
import { validateProduct } from '../../../lib/validator';
import { withToastManager } from 'react-toast-notifications';

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


        const valid = validateProduct(this.state.product);

        // if errors, notify user
        if (typeof valid === 'object') {
            const { toastManager } = this.props;
            valid.forEach(err => {
                toastManager.add(err.error, {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 20000
                });
            });

            return;
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
                        value={this.state.product[field.name]}
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
                    <SelectCategory />
                    <Price onChange={this.handleChange} />
                    {this.renderButtons()}
                </StyledForm>
            </Fragment>
        )
    }
}

export default withToastManager(Form);

const StyledForm = styled.div`
    margin-top: -1.5rem;
    
    input {
        max-height: 2.65rem;
    }

    label {
        margin-top: 1.35rem;
    }

    button {
        float: right;
        margin-top: 2rem;
        margin-left: 2rem;
        line-height: 2rem;
        min-width: 150px;
    }
`;
