import React, { Fragment } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const PromoCode = ({ code }) => (
	<Fragment>
		<StyledCode data-tip="Click to Copy 👉">KAFFI20</StyledCode>
		<ReactTooltip place="left" type="dark" effect="solid" />
	</Fragment>
);

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
