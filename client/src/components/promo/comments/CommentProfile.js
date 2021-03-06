import React from 'react';
import styled from 'styled-components';
import CommentAvatar from './CommentAvatar';
import CommentInfo from './CommentInfo';

const CommentProfile = ({ createdAt, handle, avatar, isOwner }) => {
	return (
		<StyledProfile>
			<CommentAvatar {...{ handle, avatar }} isOwner={isOwner} />
			<CommentInfo {...{ handle, createdAt }} />
		</StyledProfile>
	);
};

export default CommentProfile;

const StyledProfile = styled.div`
	display: grid;
	grid-template-columns: 4rem calc(100% - 4rem);

	/* prettier-ignore */
	grid-template-areas:
        "avatar info"
    ;

	margin-bottom: 2rem;
`;
