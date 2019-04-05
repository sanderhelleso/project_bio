import React from 'react';
import styled from 'styled-components';

const PromoCode = ({ code }) => <StyledCode>KAFFI20</StyledCode>;

export default PromoCode;

const StyledCode = styled.span`
	text-align: center;
	display: inline-block;
	padding: 0.5rem 1.5rem;
	border-radius: 4px;
	background-color: #12e2a3;
	color: #ffffff;
	letter-spacing: 2px;
	cursor: pointer;
`;
