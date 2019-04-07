import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';
import ScrollTopOfComments from './ScrollTopOfComments';
import PostComment from './PostComment';

import { connect } from 'react-redux';

const Comments = ({ profile }) => {
	const data = [
		{
			profile: {
				handle: 'sanderhelleso',
				avatar: '',
				postedAt: new Date()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		{
			profile: {
				handle: 'janteigen',
				avatar: '',
				postedAt: new Date()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		{
			profile: {
				handle: 'rudycruz',
				avatar: '',
				postedAt: new Date()
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		}
	];

	const [ state, updateComments ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comments: []
	});

	const { comments } = state;

	const byPostedAt = (a, b) => b.profile.postedAt - a.profile.postedAt;

	const isOwner = ({ profile: { handle } }) => {
		return profile.handle === handle;
	};

	const renderComments = () => {
		const loadedComments = comments.map((comment, i) => {
			return [
				<Comment key={`${i}a`} {...comment} isOwner={isOwner(comment)} />,
				<CommentSeperator key={`${i}b`} />
			];
		});

		if (loadedComments.length) {
			return (
				<Fragment>
					{loadedComments}
					<LoadMoreComments
						limit={16}
						updateComments={updateComments}
						fetchFromIndex={comments.length}
						comments={comments}
					/>
					<ScrollTopOfComments currAmount={comments.length} />
				</Fragment>
			);
		}

		return null;
	};

	return (
		<CommentsCard id="comments-cont">
			<CommentsInfo comments={comments} />
			<PostComment updateComments={updateComments} profile={profile} comments={comments} />
			{renderComments()}
		</CommentsCard>
	);
};

const mapStateToProps = ({ profile: { handle, avatar } }) => {
	return { profile: { handle, avatar } };
};

export default connect(mapStateToProps, null)(Comments);
