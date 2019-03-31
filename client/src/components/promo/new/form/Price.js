import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Grid } from '../../../styles/Grid';
import { Input, Label } from '../../../styles/Input';

class Price extends Component {
    render() {
        return (
            <Fragment>
                <Label htmlFor="price" text="Price & Currency" />
                <StyledPrice>
                    <Input placeholder="price"/>
                    <Input placeholder="currency"/>
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