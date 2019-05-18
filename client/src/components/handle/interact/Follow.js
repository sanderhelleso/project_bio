import React, { useState } from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

import { follow, unfollow } from '../../../api/profile/interact';

const Follow = () => {
	const [ following, setFollowing ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const sharedBtnProps = {
		size: 'small',
		border: true,
		disabled: loading,
		onClick: () => followAction()
	};

	const followAction = async () => {
		setLoading(true);

		await (following ? unfollow() : follow());

		setFollowing(!following);
		setLoading(false);
	};

	const renderButton = () => {
		if (following) {
			return (
				<FlatButton {...sharedBtnProps} transparent={true}>
					Following
				</FlatButton>
			);
		}

		return <Button {...sharedBtnProps}>Follow</Button>;
	};

	return <StyledFollow>{renderButton()}</StyledFollow>;
};

export default Follow;

const StyledFollow = styled.div`grid-area: follow;`;
