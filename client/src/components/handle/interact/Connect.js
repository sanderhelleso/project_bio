import React from 'react';
import styled from 'styled-components';
import { FlatButton, Button } from '../../styles/Button';

const Connect = () => {
	return (
		<StyledConnect>
			<Button size="small" transparent={true} border={true}>
				Connect
			</Button>
		</StyledConnect>
	);
};

export default Connect;

const StyledConnect = styled.div`grid-area: connect;`;
