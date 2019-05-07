import React, { useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import CharactersRemaining from './CharactersRemaining';
import { Button, Buttons } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

import { connect } from 'react-redux';
import { createComment } from '../../../api/promo/comment';

const PostComment = ({ handle, avatar, userID, promoID, addComment }) => {
	const minLength = 2;
	const maxLength = 140;

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comment: ''
	});

	const { comment } = state;

	const buildAndPostComment = async () => {
		const newComment = {
			userID,
			promoID,
			handle,
			avatar,
			createdAt: new Date().getTime(),
			body: comment
		};

		const response = await createComment(newComment);
		if (response.status < 400) {
			// todo
		}

		addComment(newComment);
		updateState({ comment: '' }); // reset comment field
		console.log(response);
	};

	const updateComment = (e) => {
		if (!e.target.value.trim() && !comment.length) return;
		updateState({ [e.target.name]: e.target.value });
	};

	return (
		<StyledComment>
			<TextArea
				minLength={minLength}
				maxLength={maxLength}
				placeholder="Post a new comment..."
				name="comment"
				onChange={(e) => updateComment(e)}
				value={comment}
			/>
			<StyledBtnCont>
				<Button
					size="small"
					onClick={() => buildAndPostComment()}
					disabled={comment.trim().length < minLength || comment.length > maxLength}
				>
					Publish
					<FeatherIcons icon="check" />
				</Button>
			</StyledBtnCont>
			<CharactersRemaining curr={comment.length} max={maxLength} />
		</StyledComment>
	);
};

const mapStateToProps = ({ profile: { handle, avatar, userID } }) => {
	return { handle, avatar, userID };
};

export default connect(mapStateToProps, null)(PostComment);

const StyledComment = styled.div`
	margin: 2rem 0 8rem 0;
	textarea {
		min-height: 150px;
	}

	@media screen and (max-width: 600px) {
		margin-bottom: 10rem;
	}
`;

const StyledBtnCont = styled.div`
	margin-top: 1rem;
	clear: both;

	button {
		float: right;
		margin-left: 1rem;
	}
`;
