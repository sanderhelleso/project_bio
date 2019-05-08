import React from 'react';
import styled from 'styled-components';
import { Button, Buttons, FlatButton } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

import newCommentReplyAction from '../../../actions/promoActions/newCommentReplyAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createComment } from '../../../api/promo/comment';

const ReplyCommentPublish = ({
	newCommentReplyAction,
	updateState,
	comment,
	minLength,
	maxLength,
	id,
	handle,
	avatar,
	userID,
	ID // current promoID
}) => {
	const publishReply = async () => {
		const replyComment = {
			userID,
			promoID: ID,
			responseToID: id,
			body: comment
		};

		const response = await createComment(replyComment);
		if (response.status < 400) {
			// todo
		}

		/*newCommentReplyAction({
			id,
			comment: { ...replyComment, avatar, handle }
		});*/

		updateState({ comment: '' });
		console.log(response);
	};

	return (
		<StyledCont>
			<Buttons>
				<Button
					size="small"
					disabled={comment.trim().length < minLength || comment.length > maxLength}
					onClick={() => publishReply()}
				>
					Publish
					<FeatherIcons icon="check" />
				</Button>
				<FlatButton size="small" onClick={() => updateState({ isOpen: false })}>
					Cancel
				</FlatButton>
			</Buttons>
		</StyledCont>
	);
};

const mapStateToProps = ({ profile: { handle, avatar, userID }, promos: { viewing: { promo: { ID } } } }) => {
	return { handle, avatar, userID, ID };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ newCommentReplyAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyCommentPublish);

const StyledCont = styled.div`
	margin-top: 1rem;
	button {
		float: right;
		margin-left: 1rem;
		margin-bottom: 1rem;
		@media screen and (max-width: 1060px) {
			min-width: 100%;
		}
	}
`;
