import React, { useState } from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

import { follow, unfollow } from '../../../api/profile/interact';

import followProfileAction from '../../../actions/followerActions/followProfileAction';
import unfollowProfileAction from '../../../actions/followerActions/unfollowProfileAction';

const Follow = ({ followProfileAction, unfollowProfileAction, handle, myHandle }) => {
	const [ following, setFollowing ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	// data for performing follow/unfollow actions
	const data = { handle, myHandle };

	const sharedBtnProps = {
		size: 'small',
		border: true,
		disabled: loading,
		onClick: () => followAction()
	};

	const followAction = async () => {
		setLoading(true);

		await (following ? unfollow(data) : follow(data));

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

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ followProfileAction, unfollowProfileAction }, dispatch);
};

const mapStateToProps = ({ profile }) => {
	return { handle: profile.viewing.handle, myHandle: profile.handle };
};

export default connect(mapStateToProps, mapDispatchToProps)(Follow);

const StyledFollow = styled.div`grid-area: follow;`;
