import React, { useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import CharactersRemaining from './CharactersRemaining';
import { Button, Buttons } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';

const PostComment = ({ updateComments, profile, comments }) => {
	const minLength = 2;
	const maxLength = 255;

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comment: ''
	});

	const { comment } = state;

	const buildAndPostComment = async () => {
		// TODO: send to endpoint
		const newComment = {
			comment,
			profile: {
				...profile,
				postedAt: new Date()
			}
		};

		updateComments({ comments: [ ...comments, newComment ] });
		updateState({ comment: '' });
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

export default PostComment;

const StyledComment = styled.div`margin: 2rem 0;`;

const StyledBtnCont = styled.div`
	margin-top: 1rem;
	clear: both;

	button {
		float: right;
		margin-left: 1rem;
	}
`;
