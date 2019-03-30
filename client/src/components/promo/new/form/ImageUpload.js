import React, { Component } from 'react';
import styled from 'styled-components';

class ImageUpload extends Component {
    render() {
        return (
            <StyledImageUpload />
        )
    }
}

export default ImageUpload;

const StyledImageUpload = styled.div`
    min-height: 27.5rem;
    max-height: 27.5rem;
    min-width: 20rem;
    max-width: 20rem;
    background-color: #eeeeee;
    border: 1px solid #e0e0e0;
`;