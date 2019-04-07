import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import { Button } from '../../styles/Button';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';

const Comments = () => {
	const data = [
		{
			profile: {
				handle: 'sanderhelleso',
				avatar: '',
				postedAt: new Date().toDateString()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		{
			profile: {
				handle: 'janteigen',
				avatar: '',
				postedAt: new Date().toDateString()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		{
			profile: {
				handle: 'rudycruz',
				avatar: '',
				postedAt: new Date().toDateString()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		}
	];

	const [ state, updateComments ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comments: data
	});

	const { comments } = state;

	const renderComments = () => {
		const loadedComments = comments.map((comment, i) => {
			return [ <Comment key={`${i}a`} {...comment} />, <CommentSeperator key={`${i}b`} /> ];
		});

		if (loadedComments.length) {
			return (
				<Fragment>
					{loadedComments}
					<LoadMoreComments
						updateComments={updateComments}
						fetchFromIndex={comments.length}
						comments={comments}
					/>
				</Fragment>
			);
		}

		return null;
	};

	return (
		<CommentsCard>
			<CommentsInfo comments={comments} />
			{renderComments()}
		</CommentsCard>
	);
};

export default Comments;
