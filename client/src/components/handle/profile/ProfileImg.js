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
	img {
		object-fit: cover;
		min-height: 60px;
		min-width: 60px;
		max-height: 60px;
		max-width: 60px;

		border-radius: 50%;
		box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.10);
	}
`;
