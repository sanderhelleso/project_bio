import React, { Fragment, useReducer, useEffect } from 'react';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';
import ScrollTopOfComments from './ScrollTopOfComments';
import PostComment from './PostComment';

import { connect } from 'react-redux';

const Comments = ({ comments, ID }) => {
	const renderComments = () => {
		const loadedComments = comments.map((comment, i) => {
			return [ <Comment key={`${i}a`} {...comment} />, <CommentSeperator key={`${i}b`} /> ];
		});

		if (loadedComments.length) {
			return (
				<Fragment>
					{loadedComments}
					<LoadMoreComments limit={16} listLength={loadedComments.length} />
					<ScrollTopOfComments currAmount={loadedComments.length} />
				</Fragment>
			);
		}

		return null;
	};

	return (
		<CommentsCard id="comments-cont">
			<CommentsInfo amountOfComments={comments.length} />
			<PostComment promoID={ID} />
			{renderComments()}
		</CommentsCard>
	);
};

const mapStateToProps = ({ promos: { viewing: { comments, promo: { ID } } } }) => {
	return { comments, ID };
};

export default connect(mapStateToProps, null)(Comments);
