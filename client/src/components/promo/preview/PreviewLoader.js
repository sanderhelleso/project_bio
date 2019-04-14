import React from 'react';
import styled from 'styled-components';
import { load } from '../../styles/Keyframes';

const PreviewLoader = () => <StyledLoader />;

export default PreviewLoader;

const StyledLoader = styled.div`
	grid-area: adds;
	background-color: #eeeeee;
	border-radius: 4px;
	animation: ${load} 2s infinite;
`;
