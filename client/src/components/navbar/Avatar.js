import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Avatar = (props) => (
	<StyledAvatar
		src={`http://localhost:5000/${props.source || 'images/avatars/default.jpg'}`}
		alt="avatar"
		onClick={() => props.history.push(`/${props.handle}`)}
	/>
);

export default withRouter(Avatar);

const StyledAvatar = styled.img`
	float: left;
	max-width: 3.35rem;
	min-width: 3.35rem;
	overflow: hidden;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	border-right: 0.5px solid #eeeeee;
	cursor: pointer;
`;
