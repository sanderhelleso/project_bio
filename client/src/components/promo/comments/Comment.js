import React from 'react';
import styled from 'styled-components';
import CommentProfile from './CommentProfile';
import ReplyCommentField from './ReplyCommentField';
import CommentReply from './CommentReply';

import { connect } from 'react-redux';

const Comment = ({ profile, comment, ownerHandle, myHandle, reply, id }) => {
	const isOwner = ownerHandle === myHandle;
	const isAuthor = myHandle === profile.handle;

	return (
		<StyledComment>
			<CommentProfile {...profile} isOwner={isOwner && isAuthor} />
			<p>{comment}</p>
			{isOwner && !isAuthor && !reply && <ReplyCommentField handle={profile.handle} id={id} />}
			{reply && <CommentReply reply={reply} />}
		</StyledComment>
	);
};

const mapStateToProps = ({ profile, promos: { viewing: { profile: { handle } } } }) => {
	return { ownerHandle: handle, myHandle: profile.handle };
};

export default connect(mapStateToProps, null)(Comment);

const StyledComment = styled.div`
	margin: 2rem 0;

	background-color: #f3f8ff;
	padding: 3rem;
	border-radius: 12px;

	p {
		font-size: 0.8rem;
		margin: 0;
	}

	@media screen and (max-width: 400px) {
		padding: 1.5rem;
	}
`;
