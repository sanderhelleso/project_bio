import React, { Fragment, useReducer, useEffect } from 'react';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';
import ScrollTopOfComments from './ScrollTopOfComments';
import PostComment from './PostComment';

import { connect } from 'react-redux';
import { getComments } from '../../../api/promo/comment';

const Comments = ({ ID }) => {
	const LIMIT = 5; // num of comments to fetch at a time

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		comments: [],
		offset: 0,
		loading: true
	});

	const { comments, offset, loading } = state;

	// load comments on load
	useEffect(() => {
		loadComments();
	}, []);

	const loadComments = async () => {
		const response = await getComments(ID, offset, LIMIT);
		if (response.status < 400) {
			updateState({ comments: [ ...comments, ...response.payload ], offset: offset + LIMIT });
		}

		// stop loading
		updateState({ loading: false });

		console.log(response);
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
					<LoadMoreComments limit={16} listLength={loadedComments.length} loadMore={loadComments} />
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
