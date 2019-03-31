import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


import SelectCategory from './SelectCategory';
import { Inputs, Input, Label } from '../../../styles/Input';
import Price from './Price';
import { Button } from '../../../styles/Button';

class Form extends Component {
    state = {
        loading: false,
        name: '',
        brand: '',
        link: '',
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

    rednerCategories() {
        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderFields() {
        return this.state.fields.map(field => {
            return (
                <Fragment>
                    <Label 
                        htmlFor={field.name} 
                        text={field.name} 
                    />
                    <Input {...field} onChange={e => this.handleChange(e)}/>
                </Fragment>
            )
        })
    }

    render() {
        return (
            <StyledForm>
                <Inputs stretch={true} stack={true}>
                    {this.renderFields()}
                </Inputs>
                <SelectCategory />
                <Price />
                <Button size="small">Add to promo</Button>
            </StyledForm>
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
