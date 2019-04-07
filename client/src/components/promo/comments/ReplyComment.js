import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import { Button, Buttons, FlatButton } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

const ReplyComment = ({ handle }) => {
	const replyTo = `Reply to ${handle}`;

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
						autoFocus
						placeholder={`${replyTo}...`}
						name="comment"
						onChange={(e) => updateState({ [e.target.name]: e.target.value })}
						value={comment}
					/>
					<Buttons id="buttons">
						<Button size="small">
							Publish
							<FeatherIcons icon="check" />
						</Button>
						<FlatButton size="small" onClick={() => updateState({ isOpen: !isOpen })}>
							Cancel
						</FlatButton>
					</Buttons>
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

export default ReplyComment;

const StyledCont = styled.div`
	margin-top: 2rem;

	textarea {
		font-size: 0.9rem;
		padding: 8px;
		min-width: 100%;
		min-height: 100px;
		resize: none;
	}

	#buttons {
		margin-top: 1rem;
		button {
			float: right;
			margin-left: 1rem;
		}
	}
`;
