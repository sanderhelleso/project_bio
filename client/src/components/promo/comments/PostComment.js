import React, { useReducer } from 'react';
import styled from 'styled-components';
import { TextArea } from '../../styles/Input';
import CharactersRemaining from './CharactersRemaining';
import { Button, Buttons } from '../../styles/Button';
import FeatherIcons from 'feather-icons-react';
import updatePromoCommentsAction from '../../../actions/promoActions/updatePromoCommentsAction';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createComment } from '../../../api/promo/comment';

const PostComment = ({ handle, avatar, userID, promoID, updatePromoCommentsAction }) => {
	const minLength = 2;
	const maxLength = 140;

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comment: ''
	});

	const { comment } = state;

	const buildAndPostComment = async () => {
		// TODO: send to endpoint
		const newComment = {
			comment,
			profile: {
				handle,
				avatar,
				postedAt: new Date()
			}
		};

		const data = {
			userID,
			promoID,
			body: comment
		};

		const response = await createComment(data);
		if (response.statis < 400) {
			// todo
		}

		updatePromoCommentsAction([ newComment ]);
		updateState({ comment: '' });
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

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updatePromoCommentsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);

const StyledComment = styled.div`
	margin: 2rem 0;
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
