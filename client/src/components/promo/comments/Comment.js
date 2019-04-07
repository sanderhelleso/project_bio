import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';
import ReplyCommentField from './ReplyCommentField';

const Comment = ({ profile, comment, isOwner, isAuthor }) => (
	<StyledComment>
		<CommentProfile {...profile} isOwner={isOwner && isAuthor} />
		<p>{comment}</p>
		{isOwner && !isAuthor && <ReplyCommentField handle={profile.handle} />}
	</StyledComment>
);

export default Comment;

const StyledComment = styled.div`
	margin: 2rem 0;

	background-color: #f3f8ff;
	padding: 3rem;
	border-radius: 12px;

	p {
		font-size: 0.8rem;
		margin: 0;
	}
`;
