import React, { Fragment } from 'react';
import styled from 'styled-components';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import { Button } from '../../styles/Button';
import LoadMore from './LoadMore';
import CommentSeperator from './CommentSeperator';

const Comments = () => {
	const comments = [
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

	const renderComments = () => {
		const loadedComments = comments.map((comment) => {
			return [ <Comment key={comment} {...comment} />, <CommentSeperator /> ];
		});

		if (loadedComments.length) {
			return (
				<Fragment>
					{loadedComments}
					<LoadMore />
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
