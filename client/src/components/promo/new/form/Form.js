import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


import SelectCategory from './SelectCategory';
import { Inputs, Input, Label } from '../../../styles/Input';
import Price from './Price';
import { Button } from '../../../styles/Button';
import UploadPromoImage from './UploadPromoImage';

class Form extends Component {
    state = {
        loading: false,
        product: this.resetProduct(),
        fields: [
            {
                placeholder: 'Name of the product',
                max: 70,
                min: 1,
                name: 'name',
                type: 'text',
                required: true
            },
            {
                placeholder: 'Brand of product',
                max: 70,
                min: 1,
                name: 'brand',
                type: 'text',
                required: true
            },
            {
                placeholder: 'Link to product',
                name: 'link',
                type: 'text',
            },
        ]
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

    renderFields() {
        return this.state.fields.map(field => {
            return (
                <Fragment key={field.name}>
                    <Label 
                        htmlFor={field.name} 
                        text={field.name} 
                    />
                    <Input {...field} onChange={e => this.handleChange(e)}/>
                </Fragment>
            )
        })
    }

    addProduct() {

        // add product to list of previews and clear form
        this.props.updateProducts(this.state.product)
        this.setState({ product: this.resetProduct() })
    }

    render() {
        return (
            <Fragment>
                <UploadPromoImage handleFile={this.handleFile} />
                <StyledForm>
                    <Inputs stretch={true} stack={true}>
                        {this.renderFields()}
                    </Inputs>
                    <SelectCategory />
                    <Price onChange={this.handleChange} />
                    <Button 
                        size="small"
                        onClick={() => this.addProduct()}
                    >
                        Add to promo
                    </Button>
                </StyledForm>
            </Fragment>
        )
    }
}

export default Form;

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
        line-height: 2rem;
    }
`;
