import React from 'react';
import styled from 'styled-components';
import CommentAvatar from './CommentAvatar';

const CommentProfile = ({ profile }) => (
	<StyledProfile>
		<CommentAvatar />
	</StyledProfile>
);

export default CommentProfile;

const StyledProfile = styled.div``;
