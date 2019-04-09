import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';
import { fadeIn } from '../../styles/Keyframes';

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
	animation: ${fadeIn} 0.5s ease-in-out;

	@media screen and (max-width: 600px) {
		margin-left: 0;
		padding-left: 0;
		padding-top: 2.25rem;
		border-top: 1.5px solid #c6cfff;
		border-left: 0;
		margin-top: 2rem;
	}
`;
