import React, { Fragment, useReducer, useEffect } from 'react';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';
import ScrollTopOfComments from './ScrollTopOfComments';
import PostComment from './PostComment';

const Comments = ({ profile, promoOwner, comments }) => {
	const isOwner = ({ handle }) => {
		return promoOwner === handle;
	};

	const isAuthor = ({ profile: { handle } }) => {
		return profile.handle === handle;
	};

	const renderComments = () => {
		const loadedComments = comments.map((comment, i) => {
			return [
				<Comment key={`${i}a`} {...comment} isAuthor={isAuthor(comment)} isOwner={isOwner(profile)} />,
				<CommentSeperator key={`${i}b`} />
			];
		});

		if (loadedComments.length) {
			return (
				<Fragment>
					{loadedComments}
					<LoadMoreComments limit={16} listLength={loadedComments.length} />
					<ScrollTopOfComments currAmount={comments.length} />
				</Fragment>
			);
		}

		return null;
	};

	return (
		<CommentsCard id="comments-cont">
			<CommentsInfo comments={comments} />
			<PostComment profile={profile} comments={comments} />
			{renderComments()}
		</CommentsCard>
	);
};

export default Comments;
