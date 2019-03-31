import React from 'react';
import styled from 'styled-components';
import FeaterIcons from 'feather-icons-react';

const text = `
Get started by adding some products to your promototions.
As a member on the free plan you can add up to 3 products
to your promotion. Once added they will appear here for preview.
`;

const NoProductsPlaceholder = () => (
    <StyledPlaceholder>
        <p>{text}</p>
    </StyledPlaceholder>
);

export default NoProductsPlaceholder;

const StyledPlaceholder = styled.div`
    text-align: center;

    p {
        color: #9e9e9e;
        font-size: 0.8rem;
    }

    svg {
        height: 2rem;
        width: 2rem;

    }
`;