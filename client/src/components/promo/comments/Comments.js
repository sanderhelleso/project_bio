import React from 'react';
import styled from 'styled-components';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';

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
		return comments.map((comment) => {
			return <Comment key={comment} {...comment} />;
		});
	};

	return (
		<CommentsCard>
			<CommentsInfo comments={comments} />
			{renderComments()}
		</CommentsCard>
	);
};

export default Comments;
