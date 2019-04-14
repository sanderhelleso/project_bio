import React from 'react';
import styled from 'styled-components';
import { load } from '../../styles/Keyframes';

const CommentsLoader = () => <StyledLoader />;

export default CommentsLoader;

const StyledLoader = styled.div`
	grid-area: comments;
	background-color: #eeeeee;
	border-radius: 4px;
	animation: ${load} 2s infinite;
`;
