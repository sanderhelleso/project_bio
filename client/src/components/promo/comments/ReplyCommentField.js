import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import { Button } from '../../styles/Button';
import ReplyCommentPublish from './ReplyCommentPublish';
import CharactersRemaining from './CharactersRemaining';

const ReplyCommentField = ({ handle }) => {
	const replyTo = `Reply to ${handle}`;
	const minLength = 2;
	const maxLength = 255;

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		isOpen: false,
		comment: ''
	});

	const { isOpen, comment } = state;

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
						onChange={(e) => updateState({ [e.target.name]: e.target.value })}
						value={comment}
					/>
					<CharactersRemaining curr={comment.length} max={maxLength} />
					<ReplyCommentPublish
						updateState={updateState}
						minLength={minLength}
						maxLength={maxLength}
						curr={comment.length}
					/>
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

const StyledCont = styled.div`margin-top: 2rem;`;
