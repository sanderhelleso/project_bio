import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import FeatherIcons from 'feather-icons-react';
import ReactTooltip from 'react-tooltip';

const CommentAvatar = ({ image, handle, history, isOwner }) => {
	const id = `owner-tooltio-${Math.random()}`;

	return (
		<StyledAvatar onClick={() => history.push(`/${handle}`)}>
			{isOwner && (
				<StyledIsOwnerBadge data-tip="Owner of promo" data-for={id}>
					<FeatherIcons icon="check" />
					<ReactTooltip id={id} place="right" type="dark" effect="solid" />
				</StyledIsOwnerBadge>
			)}
			<img src={`http://localhost:5000/${image || 'images/avatars/default.jpg'}`} />
		</StyledAvatar>
	);
};

export default withRouter(CommentAvatar);

const StyledAvatar = styled.div`
	grid-area: avatar;
	position: relative;

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
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	}
`;

const StyledIsOwnerBadge = styled.span`
	position: absolute;
	right: -7.5px;
	top: -7.5px;
	border-radius: 50%;
	min-height: 1.5rem;
	min-width: 1.5rem;
	background-color: #12e2a3;
	color: #ffffff;
	box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

	svg {
		height: 1rem;
		width: 1rem;
		position: absolute;
		top: 15%;
		left: 50%;
		transform: translate(-50%);
	}
`;
