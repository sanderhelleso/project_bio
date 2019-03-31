import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Grid } from '../../../styles/Grid';
import { Input, Label } from '../../../styles/Input';

class Price extends Component {
    fields = [
        {
            placeholder: 'Price',
            max: 10,
            name: 'price',
            type: 'text'
        },
        {
            placeholder: 'Currency',
            max: 3,
            name: 'currency',
            type: 'text'
        }
    ]

    renderFields() {
        return this.fields.map(field => {
            return (
                <Input 
                    key={field.name} 
                    {...field} 
                    onChange={this.props.onChange} 
                />
            )
        });
    }

    render() {
        return (
            <Fragment>
                <Label htmlFor="price" text="Price & Currency" />
                <StyledPrice>
                    {this.renderFields()}
                </StyledPrice>
            </Fragment>
        )
    }
}

export default Price;

const StyledPrice = styled.div`
    input {
        max-width: 47.5%;

        &:nth-child(1) {
            margin-right: 5%;
        }
    }
`;