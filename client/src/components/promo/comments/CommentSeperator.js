import React from 'react';
import styled from 'styled-components';

const CommentSeperator = () => <StyledSeperator />;

export default CommentSeperator;

const StyledSeperator = styled.div`
	min-height: 100px;
	min-width: 1.5px;
	max-width: 1.5px;
	margin: 0 auto;
	background-color: #eeeeee;
`;
