import React from 'react';
import styled from 'styled-components';
import { FlatButton } from '../../styles/Button';

const Following = () => {
	return (
		<StyledFollowing>
			<FlatButton size="small">Following</FlatButton>
		</StyledFollowing>
	);
};

export default Following;

const StyledFollowing = styled.div`grid-area: following;`;
