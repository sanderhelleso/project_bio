import React, { Fragment, useReducer, useEffect } from 'react';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';
import ScrollTopOfComments from './ScrollTopOfComments';
import PostComment from './PostComment';

import { connect } from 'react-redux';
import { getComments, getCommentsCount } from '../../../api/promo/comment';

const Comments = ({ ID }) => {
	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comments: [],
		count: 0, // number of total comments for current promo
		offset: 0, // keep tracks of where to fetch next batch from
		limit: 5, // num of comments to fetch at a time
		loading: true
	});

	const { comments, count, offset, limit, loading } = state;

	// load comments and count on load
	useEffect(() => {
		countComments();
	}, []);

	// loads the amount of comments for the current promo
	const countComments = async () => {
		const response = await getCommentsCount(ID);
		if (response.status < 400) {
			// update count and load in comments if exists
			updateState({ count: response.payload });
			if (response.payload) return await loadComments();
		}

		updateState({ loading: false });
	};

	// loads a new batch of comments
	const loadComments = async () => {
		const response = await getComments(ID, offset, limit);
		if (response.status < 400) {
			updateState({ comments: [ ...comments, ...response.payload ], offset: offset + limit });
		}

		updateState({ loading: false });
	};

	const renderComments = () => {
		if (loading) return <p>Loading...</p>;
		if (!comments.length) return null;

		const loadedComments = comments.map((comment, i) => {
			return [ <Comment key={`${i}a`} {...comment} />, <CommentSeperator key={`${i}b`} /> ];
		});

		if (loadedComments.length) {
			return (
				<Fragment>
					{loadedComments}
					<LoadMoreComments limit={count} listLength={loadedComments.length} loadMore={loadComments} />
					<ScrollTopOfComments currAmount={loadedComments.length} />
				</Fragment>
			);
		}

		return null;
	};

	const renderInfo = () => {
		if (!loading) {
			return <CommentsInfo amountOfComments={comments.length} />;
		}

		return null;
	};

	return (
		<CommentsCard id="comments-cont">
			{renderInfo()}
			<PostComment promoID={ID} />
			{renderComments()}
		</CommentsCard>
	);
};

const mapStateToProps = ({ promos: { viewing: { promo: { ID } } } }) => {
	return { ID };
};

export default connect(mapStateToProps, null)(Comments);
