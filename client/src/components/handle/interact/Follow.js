import React from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

const Follow = () => {
	return (
		<StyledFollow>
			<Button size="small" transparent={true} border={true}>
				Follow
			</Button>
		</StyledFollow>
	);
};

export default Follow;

const StyledFollow = styled.div`grid-area: follow;`;
