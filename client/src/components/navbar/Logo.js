import React from 'react';
import styled from 'styled-components';

const Logo = () => (
    <StyledLogo>Project Bio</StyledLogo>
);

export default Logo;

const StyledLogo = styled.h5`
    margin-top: 2rem;
    margin-left: 3rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    float: left;
    font-size: 1.25rem;
`;