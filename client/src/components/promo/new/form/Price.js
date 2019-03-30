import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from '../../../styles/Grid';
import { Input, Label } from '../../../styles/Input';

class Price extends Component {
    render() {
        return (
            <StyledDiv>
                <Label htmlFor="price" text="Price & Currency" />
                <StyledPrice>
                    <Input placeholder="price"/>
                    <Input placeholder="currency"/>
                </StyledPrice>
            </StyledDiv>
        )
    }
}

export default Price;

const StyledDiv = styled.div`
    margin-top: 2rem;
`

const StyledPrice = styled.div`
    input {
        max-width: 47.5%;

        &:nth-child(1) {
            margin-right: 5%;
        }
    }
`;