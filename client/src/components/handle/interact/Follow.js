import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

import { follow, unfollow, checkReleationship } from '../../../api/profile/interact';

const Follow = ({ userID, userFollowingID }) => {
	// shared props for both buttons of component
	const sharedBtnProps = {
		size: 'small',
		border: true,
		disabled: loading,
		onClick: () => followAction()
	};

	// data for performing follow/unfollow actions
	const data = { userID, userFollowingID };

	const [ state, updateState ] = useReducer((state, newState) => ({ ...state, ...newState }), {
		loading: true,
		following: false,
		checkedReleationship: false
	});

	const { loading, following, checkedReleationship } = state;

	// check releationship on load and determine state
	useEffect(() => {
		isFollowing();
	}, []);

	const isFollowing = async () => {
		// check if the follower releationship is present
		// eg user with userFollowingID follows user with userID
		const response = await checkReleationship(data);

		let have = false;
		if (response.status < 400) have = response.payload;

		updateState({
			loading: false,
			following: have,
			checkedReleationship: true
		});
	};

	const followAction = async () => {
		updateState({ loading: false, following: !following });

		await (following ? unfollow(data) : follow(data));

		updateState({ loading: false });
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

	return <StyledFollow>{checkedReleationship && renderButton()}</StyledFollow>;
};

export default Follow;

const StyledFollow = styled.div`grid-area: follow;`;
