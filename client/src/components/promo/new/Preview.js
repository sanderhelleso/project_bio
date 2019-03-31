import React from 'react';
import styled from 'styled-components';
import blobToSrc from '../../../lib/blobToSrc';

const Preview = ({ image, name, brand }) => (
    <StyledPreview>
        {console.log(image.get('promo'))}
        <img src={blobToSrc(image.get('promo'))} alt="preview" />
        <h5>{name}</h5>
        <p>{brand}</p>
    </StyledPreview>
);

export default Preview;

const StyledPreview = styled.div`
    img {
        min-height: 50px;
        max-height: 50px;
        min-width: 50px;
        max-width: 50px;
    }
`;