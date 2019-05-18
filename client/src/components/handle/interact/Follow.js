import React, { useState } from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

import { follow, unfollow } from '../../../api/profile/interact';

const Follow = () => {
	const [ following, setFollowing ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const followAction = async () => {
		setLoading(true);

		await (following ? unfollow() : follow());

		setFollowing(!following);
		setLoading(false);
	};

	const renderButton = () => {
		if (following) {
			return (
				<FlatButton size="small" transparent={true} border={true} onClick={() => followAction()}>
					Following
				</FlatButton>
			);
		}

		return (
			<Button size="small" border={true} onClick={() => followAction()}>
				Follow
			</Button>
		);
	};

	return <StyledFollow>{renderButton()}</StyledFollow>;
};

export default Follow;

const StyledFollow = styled.div`grid-area: follow;`;
