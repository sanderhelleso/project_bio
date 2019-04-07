import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import { Button } from '../../styles/Button';
import ReplyCommentPublish from './ReplyCommentPublish';

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
					<StyledHelper>
						{comment.length}/{maxLength} <span>remaining</span>
					</StyledHelper>
					<ReplyCommentPublish updateState={updateState} />
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

	textarea {
		font-size: 0.9rem;
		padding: 8px;
		min-width: 100%;
		min-height: 100px;
		resize: none;
	}
`;

const StyledHelper = styled.span`
	float: left;
	font-size: 0.8rem;
	margin-top: 1rem;
	font-weight: 800;
	color: ${(props) => props.theme.weakerColor};

	span {
		font-weight: 400;
		margin-left: 3px;
	}
`;
