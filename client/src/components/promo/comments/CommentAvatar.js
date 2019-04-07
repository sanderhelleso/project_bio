import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const CommentAvatar = ({ image, handle, history }) => (
	<StyledAvatar onClick={() => history.push(`/${handle}`)}>
		<img src={`http://localhost:5000/${image || 'images/avatars/default.jpg'}`} />
	</StyledAvatar>
);

export default withRouter(CommentAvatar);

const StyledAvatar = styled.div`
	grid-area: avatar;

	min-height: 3rem;
	max-width: 3rem;
	min-width: 3rem;
	max-height: 3rem;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
`;
