import React, { useState } from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

const Follow = () => {
	const [ following, setFollowing ] = useState(false);

	const renderButton = () => {
		if (following) {
			return (
				<FlatButton size="small" transparent={true} border={true} onClick={() => setFollowing(false)}>
					Following
				</FlatButton>
			);
		}

		return (
			<Button size="small" border={true} onClick={() => setFollowing(true)}>
				Follow
			</Button>
		);
	};

	return <StyledFollow>{renderButton()}</StyledFollow>;
};

export default Follow;

const StyledFollow = styled.div`grid-area: follow;`;
