import React, { useState } from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';
import ReplyCommentField from './ReplyCommentField';
import CommentReply from './CommentReply';

import { connect } from 'react-redux';
import { fadeIn } from '../../styles/Keyframes';

const Comment = ({ createdAt, handle, avatar, body, ownerHandle, myHandle, reply, id }) => {
	// decide owner and author state
	const isOwner = ownerHandle === myHandle;
	const isAuthor = myHandle === handle;

	// sets a new reply to current comments
	const [ replyComment, setReply ] = useState(reply);

	const renderCommentField = () => {
		if (isOwner && !isAuthor && !replyComment) {
			return <ReplyCommentField {...{ handle, id }} setReply={setReply} />;
		}

		return null;
	};

	return (
		<StyledComment>
			<CommentProfile {...{ createdAt, handle, avatar }} isOwner={isOwner && isAuthor} />
			<p>{body}</p>
			{renderCommentField()}
			{replyComment && <CommentReply {...replyComment} />}
		</StyledComment>
	);
};

const mapStateToProps = ({ profile, promos: { viewing: { profile: { handle } } } }) => {
	return { ownerHandle: handle, myHandle: profile.handle };
};

export default connect(mapStateToProps, null)(Comment);

const StyledComment = styled.div`
	animation: ${fadeIn} 0.5s ease-in-out;
	margin: 2rem 0;

	background-color: #f3f8ff;
	padding: 3rem;
	border-radius: 12px;
	display: grid;

	p {
		font-size: 0.8rem;
		margin: 0;
	}

	@media screen and (max-width: 400px) {
		padding: 1.5rem;
	}
`;
