import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';

const CommentReply = ({ reply: { profile, comment } }) => (
	<StyledReply>
		<CommentProfile {...profile} isOwner={true} />
		<p>{comment}</p>
	</StyledReply>
);

export default CommentReply;

const StyledReply = styled.div`
	margin-top: 3rem;
	margin-left: 2rem;
	padding-left: 2rem;
	border-left: 1.5px solid #c6cfff;
`;
