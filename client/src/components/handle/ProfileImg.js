import React from 'react';
import styled from 'styled-components';

const ProfileImg = ({ avatar }) => {
	return (
		<StyledImgCont>
			<img src={`http://localhost:5000/${avatar || 'images/avatars/default.jpg'}`} alt={`Users's avatar`} />
		</StyledImgCont>
	);
};

export default ProfileImg;

const StyledImgCont = styled.div`
	float: left;
	margin-right: 1.25rem;

	img {
		object-fit: cover;
		min-height: 70px;
		min-width: 70px;
		max-height: 70px;
		max-width: 70px;

		border-radius: 50%;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
	}
`;
