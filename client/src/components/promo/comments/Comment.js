import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';
import ReplyCommentField from './ReplyCommentField';
import CommentReply from './CommentReply';

const Comment = ({ profile, comment, isOwner, isAuthor, reply }) => (
	<StyledComment>
		<CommentProfile {...profile} isOwner={isOwner && isAuthor} />
		<p>{comment}</p>
		{isOwner && !isAuthor && !reply && <ReplyCommentField handle={profile.handle} />}
		{reply && <CommentReply reply={reply} />}
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
