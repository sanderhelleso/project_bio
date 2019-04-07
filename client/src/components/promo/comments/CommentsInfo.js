import React from 'react';
import styled from 'styled-components';

const CommentsInfo = ({ comments }) => {
	const renderComments = () => {
		if (!comments.length) {
			return <h5>No comments has been posted yet</h5>;
		}

		return <h5>Showing {comments.length} comments</h5>;
	};

	return <StyledInfo>{renderComments()}</StyledInfo>;
};

export default CommentsInfo;

const StyledInfo = styled.div``;
