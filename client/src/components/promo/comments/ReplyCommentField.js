import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import { Button } from '../../styles/Button';
import ReplyCommentPublish from './ReplyCommentPublish';
import CharactersRemaining from './CharactersRemaining';

const ReplyCommentField = ({ handle, id, setReply }) => {
	const replyTo = `Reply to ${handle}`;
	const minLength = 2;
	const maxLength = 140;

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		isOpen: false,
		comment: ''
	});

	const { isOpen, comment } = state;

	const updateComment = (e) => {
		if (!e.target.value.trim() && !comment.length) return;
		updateState({ [e.target.name]: e.target.value });
	};

	// sets the given reply to the comment and resets the state of comment field
	const setReplyAndClose = (reply) => {
		updateState({ comment: '', isOpen: false });
		setReply(reply);
	};

	const renderField = () => {
		if (isOpen) {
			return (
				<Fragment>
					<TextArea
						minLength={minLength}
						maxLength={maxLength}
						autoFocus
						placeholder={`${replyTo}...`}
						name="comment"
						onChange={(e) => updateComment(e)}
						value={comment}
					/>
					<ReplyCommentPublish
						minLength={minLength}
						maxLength={maxLength}
						comment={comment}
						id={id}
						updateState={updateState}
						setReplyAndClose={setReplyAndClose}
					/>
					<CharactersRemaining curr={comment.length} max={maxLength} />
				</Fragment>
			);
		}

		return (
			<Button size="small" onClick={() => updateState({ isOpen: !isOpen })}>
				{replyTo}
			</Button>
		);
	};

	return <StyledCont>{renderField()}</StyledCont>;
};

export default ReplyCommentField;

const StyledCont = styled.div`
	margin-top: 2rem;
	clear: both;
`;
