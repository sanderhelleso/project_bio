import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';
import ReplyComment from './ReplyComment';

const Comment = ({ profile, comment }) => (
	<StyledComment>
		<CommentProfile {...profile} />
		<p>{comment}</p>
		<ReplyComment handle={profile.handle} />
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
