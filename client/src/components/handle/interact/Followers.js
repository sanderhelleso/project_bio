import React from 'react';
import styled from 'styled-components';
import { FlatButton } from '../../styles/Button';

const Followers = () => {
	return (
		<StyledFollowers>
			<FlatButton size="small">Followers</FlatButton>
		</StyledFollowers>
	);
};

export default Followers;

const StyledFollowers = styled.div`grid-area: followers;`;
