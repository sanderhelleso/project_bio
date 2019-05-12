import React from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

const PreviewInfo = ({ title, description, avatar, handle, history }) => {
	const cropDescription = () => {
		if (description.length > 200) {
			return `${description.substring(0, 200)}...`;
		}

		return description;
	};

	return (
		<StyledInfo>
			<h3>{title}</h3>
			<StyledProfile onClick={() => history.push(`/${handle}`)}>
				<img
					src={`http://localhost:5000/${avatar || 'images/avatars/default.jpg'}`}
					alt={`${handle}'s avatar`}
				/>
				<h5 onClick={() => history.push(`/${handle}`)}>
					by <span>{handle}</span>
				</h5>
			</StyledProfile>
			<p>{cropDescription()}</p>
		</StyledInfo>
	);
};

export default withRouter(PreviewInfo);

const StyledInfo = styled.div`
	position: relative;
	h3 {
		font-size: 1.65rem;
		margin-top: 0;
		margin-bottom: 0.45rem;
	}

	p {
		font-size: 0.8rem;
	}
`;

const StyledProfile = styled.div`
	img {
		min-width: 1.65rem;
		max-width: 1.65rem;
		min-height: 1.65rem;
		max-height: 1.65rem;
		border-radius: 4px;
		cursor: pointer;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
		float: left;
	}

	h5 {
		display: inline-block;
		font-size: 0.8rem;
		margin-left: 0.75rem;
		margin-top: -0.5rem;
		margin-bottom: 0;
		font-weight: 100;
		color: #9e9e9e;
		cursor: pointer;

		span {
			font-weight: 400;
			color: #000000;
		}
	}

	margin-bottom: 2rem;
`;
