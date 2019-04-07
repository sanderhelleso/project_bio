import React, { Fragment, useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CommentsCard } from '../../styles/Card';
import CommentsInfo from './CommentsInfo';
import Comment from './Comment';
import LoadMoreComments from './LoadMoreComments';
import CommentSeperator from './CommentSeperator';
import ScrollTopOfComments from './ScrollTopOfComments';
import PostComment from './PostComment';
import updatePromoCommentsAction from '../../../actions/promoActions/updatePromoCommentsAction';

import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../../../../../Users/sande/AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

const Comments = ({ updatePromoCommentsAction, profile, promoOwner, comments }) => {
	const data = [
		{
			id: 1,
			profile: {
				handle: 'sanderhelleso',
				avatar: '',
				postedAt: new Date()
			},
			reply: false,
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		{
			id: 2,
			profile: {
				handle: 'janteigen',
				avatar: '',
				postedAt: new Date()
			},
			reply: {
				profile: {
					handle: 'sanderhelleso',
					avatar: '',
					postedAt: new Date()
				},
				comment:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
			},
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		},
		{
			id: 3,
			profile: {
				handle: 'rudycruz',
				avatar: '',
				postedAt: new Date()
			},
			reply: false,
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus lorem id porta sodales. Etiam a leo convallis, rhoncus felis at, pharetra mi. '
		}
	];

	const [ loading, isLoading ] = useState(true);

	useEffect(() => {
		updatePromoCommentsAction(data);
		isLoading(false);
	}, []);

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
					<LoadMoreComments limit={16} fetchFromIndex={comments.length} comments={comments} />
					<ScrollTopOfComments currAmount={comments.length} />
				</Fragment>
			);
		}

		return null;
	};

	return (
		<CommentsCard id="comments-cont">
			{!loading && <CommentsInfo comments={comments} />}
			<PostComment profile={profile} />
			{!loading && renderComments()}
		</CommentsCard>
	);
};

const mapStateToProps = ({ profile: { handle, avatar }, promos: { viewing: { comments } } }) => {
	return { profile: { handle, avatar }, comments };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updatePromoCommentsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
