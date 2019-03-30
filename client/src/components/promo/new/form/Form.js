import React, { Component } from 'react';
import styled from 'styled-components';


import SelectCategory from './SelectCategory';
import { Inputs, Input } from '../../../styles/Input';
import Price from './Price';

class Form extends Component {
    state = {
        loading: false,
        fields: [
            {
                placeholder: 'Title of promotion',
                max: 70,
                min: 1,
                name: 'title',
                type: 'text',
                required: true
            },
            {
                placeholder: 'Brand of product(s)',
                max: 70,
                min: 1,
                name: 'brand',
                type: 'text',
                required: true
            },
            {
                placeholder: 'Description of promo',
                max: 255,
                name: 'description',
                type: 'text'
            },
            {
                placeholder: 'Price of prduct',
                name: 'description',
                type: 'text',
            },
            {
                placeholder: 'Discount',
                name: 'description',
                type: 'text',
            }
        ]
    }

    rednerCategories() {
        
    }

    renderFields() {
        return this.state.fields.map(field => {
            return (
                <Input {...field} />
            )
        })
    }

    render() {
        return (
            <StyledForm>
                <SelectCategory />
                <Price />
            </StyledForm>
        )
    }
}

export default Form;

const StyledForm = styled.div`
    input {
        margin-bottom: 1rem;
        max-height: 2.65rem;
    }
`;
