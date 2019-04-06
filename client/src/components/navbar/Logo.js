import React from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

const Logo = (props) => <StyledLogo onClick={() => props.history.push('/')}>Project Bio</StyledLogo>;

export default withRouter(Logo);

const StyledLogo = styled.h5`
	margin-top: 2rem;
	margin-left: 3rem;
	letter-spacing: 2px;
	text-transform: uppercase;
	float: left;
	font-size: 1.25rem;
	cursor: pointer;
`;
