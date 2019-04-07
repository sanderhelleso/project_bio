import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';

const Comment = ({ comment }) => (
	<StyledComment>
		<CommentProfile />
	</StyledComment>
);

export default Comment;

const StyledComment = styled.div``;
