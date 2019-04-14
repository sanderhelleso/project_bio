import React from 'react';
import styled from 'styled-components';
import { load } from '../../styles/Keyframes';

const PromoLoader = () => <StyledLoader />;

export default PromoLoader;

const StyledLoader = styled.div`
	grid-area: promo;
	background-color: #e0e0e0;
	border-radius: 4px;
	animation: ${load} 2s infinite;
`;
