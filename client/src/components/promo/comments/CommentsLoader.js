import React from 'react';
import styled from 'styled-components';

const CommentsLoader = () => <StyledLoader />;

export default CommentsLoader;

const StyledLoader = styled.div`
	grid-area: comments;
	background-color: #eeeeee;
`;
