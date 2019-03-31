import React from 'react';
import styled from 'styled-components';

const inputStyles = `
    outline: none;
    background-image: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    font-family: 'Poppins', sans-serif;
    border-radius: 4px;
    transition: 0.3s ease-in-out;
`;

export const Inputs = styled.div`
    
    input {
        display: ${props => props.stack ? 'block' : 'inline-block'};
        min-width: ${props => props.stretch ? '100%' : 'none'};
    }
`

export const Input = styled.input`
    ${inputStyles}
    border: 1.5px solid ${props => props.theme.disabledBg};

    &::placeholder {
        opacity: 0.7;
    }

    &:focus, &:active {
        border: 1.5px solid ${props => props.theme.primaryColor};
    }

    &:disabled {
        background-color: ${props => props.theme.disabledBg};
        cursor: not-allowed;
        opacity: 0.7;

        &:focus, &:active {
            border: 1.5px solid ${props => props.theme.disabledBg};
        }
    }
`

export const Label = ({ htmlFor, text }) => (
    <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>
)

const StyledLabel = styled.label`
    font-weight: 600;
    margin-bottom: 0.75rem;
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.3;
`;