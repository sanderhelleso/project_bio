import React from 'react';
import styled from 'styled-components';

import ProfileImg from './ProfileImg';
import ProfileDetails from './ProfileDetails';

const ProfileInfo = ({ handle, avatar, name, bio }) => {
	return (
		<StyledProfileCont>
			<ProfileImg avatar={avatar} />
			<ProfileDetails handle={handle} name={name} bio={bio} />
		</StyledProfileCont>
	);
};

export default ProfileInfo;

const StyledProfileCont = styled.div`margin-top: 10vh;`;
